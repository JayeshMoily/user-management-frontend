import { store } from '../redux/store';
import { fetchChatHistory } from '../features/chat/chatSlice';
import { showChatNotification, playNotificationSound } from '../utils/notifications';
import type { ChatMessage } from '../types/chat.types';

type ChatEventCallback = (data: any) => void;

class ChatService {
  private eventListeners: Map<string, ChatEventCallback[]> = new Map();
  private pollingInterval: number | null = null;
  private isPolling = false;
  private pollingRate = 3000; // 3 seconds
  private retryCount = 0;
  private maxRetries = 5;
  private isPageVisible = true;
  private lastMessageCount = 0;
  private currentUserId: number | null = null;

  constructor() {
    this.setupVisibilityListener();
  }

  private setupVisibilityListener() {
    document.addEventListener('visibilitychange', () => {
      this.isPageVisible = !document.hidden;
      if (this.isPageVisible && this.isPolling) {
        this.startPolling();
      } else if (!this.isPageVisible) {
        this.stopPolling();
      }
    });
  }

  // Event system for real-time updates
  on(event: string, callback: ChatEventCallback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  off(event: string, callback: ChatEventCallback) {
    const callbacks = this.eventListeners.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private emit(event: string, data: any) {
    const callbacks = this.eventListeners.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }

  // Set current user for notifications
  setCurrentUser(userId: number) {
    this.currentUserId = userId;
  }

  // Check for new messages and trigger notifications
  private checkForNewMessages(messages: ChatMessage[]) {
    if (messages.length > this.lastMessageCount && this.lastMessageCount > 0) {
      const newMessages = messages.slice(this.lastMessageCount);
      
      newMessages.forEach(message => {
        // Only notify for messages from other users
        if (message.user.id !== this.currentUserId && !this.isPageVisible) {
          const senderName = message.user.is_deleted 
            ? 'Unknown User' 
            : `${message.user.firstName} ${message.user.lastName}`;
          
          showChatNotification(senderName, message.message, {
            onClick: () => {
              this.emit('notificationClicked', { messageId: message.chat_id });
            }
          });
          
          playNotificationSound();
        }
      });

      this.emit('newMessages', { 
        count: newMessages.length, 
        messages: newMessages 
      });
    }
    
    this.lastMessageCount = messages.length;
  }

  // Polling-based real-time updates
  startPolling() {
    if (this.pollingInterval || !this.isPageVisible) return;

    this.isPolling = true;
    this.pollingInterval = setInterval(async () => {
      try {
        const result = await store.dispatch(fetchChatHistory());
        if (fetchChatHistory.fulfilled.match(result)) {
          this.retryCount = 0;
          this.checkForNewMessages(result.payload);
          this.emit('messagesUpdated', result.payload);
        }
      } catch (error) {
        console.error('Polling error:', error);
        this.retryCount++;
        
        if (this.retryCount >= this.maxRetries) {
          console.warn('Max polling retries reached. Stopping real-time updates.');
          this.stopPolling();
          this.emit('connectionError', { error, retryCount: this.retryCount });
        }
      }
    }, this.pollingRate);

    this.emit('pollingStarted', { pollingRate: this.pollingRate });
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      this.isPolling = false;
      this.emit('pollingStopped', {});
    }
  }

  // Manual refresh
  async refreshMessages() {
    try {
      this.retryCount = 0;
      const result = await store.dispatch(fetchChatHistory());
      if (fetchChatHistory.fulfilled.match(result)) {
        this.emit('messagesUpdated', result.payload);
        
        // Restart polling if it was stopped due to errors
        if (!this.pollingInterval && this.isPolling) {
          this.startPolling();
        }
      }
      return result;
    } catch (error) {
      console.error('Manual refresh error:', error);
      this.emit('connectionError', { error, retryCount: this.retryCount });
      throw error;
    }
  }

  // Set polling rate
  setPollingRate(rate: number) {
    this.pollingRate = rate;
    if (this.isPolling) {
      this.stopPolling();
      this.startPolling();
    }
  }

  // Get current status
  getStatus() {
    return {
      isPolling: this.isPolling,
      retryCount: this.retryCount,
      pollingRate: this.pollingRate,
      isPageVisible: this.isPageVisible,
    };
  }

  // Cleanup
  destroy() {
    this.stopPolling();
    this.eventListeners.clear();
    document.removeEventListener('visibilitychange', this.setupVisibilityListener);
  }

  // Future: WebSocket support
  connectWebSocket(_url: string) {
    // Implementation for WebSocket connection
    // This can be added when backend supports WebSockets
    console.log('WebSocket support not yet implemented');
  }
}

// Singleton instance
export const chatService = new ChatService();