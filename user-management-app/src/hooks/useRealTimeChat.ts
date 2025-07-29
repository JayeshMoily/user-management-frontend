import { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchChatHistory } from '../features/chat/chatSlice';

interface UseRealTimeChatOptions {
  enabled?: boolean;
  pollingInterval?: number;
  maxRetries?: number;
}

export const useRealTimeChat = ({
  enabled = true,
  pollingInterval = 2000, // 2 seconds
  maxRetries = 3,
}: UseRealTimeChatOptions = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, loading } = useSelector((state: RootState) => state.chat);
  const intervalRef = useRef<number | null>(null);
  const retryCountRef = useRef(0);
  const lastMessageCountRef = useRef(0);
  const isActiveRef = useRef(true);

  // Check if page is visible/active
  const handleVisibilityChange = useCallback(() => {
    isActiveRef.current = !document.hidden;
    if (document.hidden) {
      // Page is hidden, stop polling
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      // Page is visible, restart polling
      startPolling();
    }
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!enabled || loading || !isActiveRef.current) return;

    try {
      await dispatch(fetchChatHistory()).unwrap();
      retryCountRef.current = 0; // Reset retry count on success
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
      retryCountRef.current += 1;
      
      // Stop polling if max retries reached
      if (retryCountRef.current >= maxRetries) {
        console.warn('Max retries reached for chat polling. Stopping real-time updates.');
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    }
  }, [dispatch, enabled, loading, maxRetries]);

  const startPolling = useCallback(() => {
    if (intervalRef.current || !enabled) return;

    intervalRef.current = setInterval(fetchMessages, pollingInterval);
  }, [fetchMessages, pollingInterval, enabled]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start/stop polling based on enabled state
  useEffect(() => {
    if (enabled && isActiveRef.current) {
      startPolling();
    } else {
      stopPolling();
    }

    return stopPolling;
  }, [enabled, startPolling, stopPolling]);

  // Listen for page visibility changes
  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  // Track new messages for notifications
  useEffect(() => {
    if (messages.length > lastMessageCountRef.current && lastMessageCountRef.current > 0) {
      // New message received
      const newMessagesCount = messages.length - lastMessageCountRef.current;
      console.log(`${newMessagesCount} new message(s) received`);
      
      // You can add notification logic here
      // For example: show browser notification, play sound, etc.
    }
    lastMessageCountRef.current = messages.length;
  }, [messages.length]);

  // Manual refresh function
  const refreshChat = useCallback(() => {
    retryCountRef.current = 0; // Reset retry count
    fetchMessages();
    if (!intervalRef.current && enabled) {
      startPolling(); // Restart polling if it was stopped
    }
  }, [fetchMessages, enabled, startPolling]);

  return {
    refreshChat,
    isPolling: !!intervalRef.current,
    retryCount: retryCountRef.current,
    stopPolling,
    startPolling,
  };
};