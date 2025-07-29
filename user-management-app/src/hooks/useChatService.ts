import { useEffect, useState } from 'react';
import { chatService } from '../services/chatService';

interface ChatServiceStatus {
  isConnected: boolean;
  retryCount: number;
  pollingRate: number;
  lastUpdate: Date | null;
}

export const useChatService = () => {
  const [status, setStatus] = useState<ChatServiceStatus>({
    isConnected: false,
    retryCount: 0,
    pollingRate: 3000,
    lastUpdate: null,
  });

  useEffect(() => {
    // Event listeners
    const handlePollingStarted = () => {
      setStatus(prev => ({ ...prev, isConnected: true }));
    };

    const handlePollingStopped = () => {
      setStatus(prev => ({ ...prev, isConnected: false }));
    };

    const handleMessagesUpdated = () => {
      setStatus(prev => ({ ...prev, lastUpdate: new Date() }));
    };

    const handleConnectionError = (data: { retryCount: number }) => {
      setStatus(prev => ({ 
        ...prev, 
        retryCount: data.retryCount,
        isConnected: data.retryCount < 5, // Stop considering connected after max retries
      }));
    };

    // Subscribe to events
    chatService.on('pollingStarted', handlePollingStarted);
    chatService.on('pollingStopped', handlePollingStopped);
    chatService.on('messagesUpdated', handleMessagesUpdated);
    chatService.on('connectionError', handleConnectionError);

    // Start the service
    chatService.startPolling();

    // Cleanup
    return () => {
      chatService.off('pollingStarted', handlePollingStarted);
      chatService.off('pollingStopped', handlePollingStopped);
      chatService.off('messagesUpdated', handleMessagesUpdated);
      chatService.off('connectionError', handleConnectionError);
    };
  }, []);

  const refreshMessages = () => {
    return chatService.refreshMessages();
  };

  const setPollingRate = (rate: number) => {
    setStatus(prev => ({ ...prev, pollingRate: rate }));
    chatService.setPollingRate(rate);
  };

  return {
    status,
    refreshMessages,
    setPollingRate,
    startPolling: () => chatService.startPolling(),
    stopPolling: () => chatService.stopPolling(),
  };
};