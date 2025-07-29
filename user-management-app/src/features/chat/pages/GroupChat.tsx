import { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../redux/store';
import { fetchChatHistory, sendMessage } from '../chatSlice';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';
import { ErrorAlert } from '../../../common/components/ErrorAlert';
import { useAuth } from '../../../hooks/useAuth';
import { requestNotificationPermission } from '../../../utils/notifications';
import { CHAT_CONV_ID } from '../../../utils/constants';

export const GroupChat = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { messages, loading, sending, error } = useSelector((state: RootState) => state.chat);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isPolling, setIsPolling] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [userHasScrolledUp, setUserHasScrolledUp] = useState(false);
  const lastScrollTop = useRef(0);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [showNewMessagePopup, setShowNewMessagePopup] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024 && window.innerWidth > 768);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth <= 768);
  const pollingIntervalRef = useRef<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Fetch messages function
  const fetchMessages = useCallback(async () => {
    setIsFetching(true);
    try {
      console.log('🔄 Fetching chat messages...', new Date().toLocaleTimeString());
      const result = await dispatch(fetchChatHistory()).unwrap();
      setLastFetchTime(new Date());
      console.log('✅ Chat messages updated:', result.length, 'messages');
    } catch (error) {
      console.error('❌ Failed to fetch messages:', error);
    } finally {
      setIsFetching(false);
    }
  }, [dispatch]);

  // Start polling
  const startPolling = useCallback(() => {
    if (pollingIntervalRef.current) return;
    
    console.log('🟢 Starting chat polling...');
    setIsPolling(true);
    pollingIntervalRef.current = window.setInterval(() => {
      if (!document.hidden) { // Only poll when tab is visible
        fetchMessages();
      }
    }, 3000); // Poll every 3 seconds
  }, [fetchMessages]);

  // Stop polling
  const stopPolling = () => {
    if (pollingIntervalRef.current) {
      console.log('🔴 Stopping chat polling...');
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
      setIsPolling(false);
    }
  };

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopPolling();
      } else {
        startPolling();
        fetchMessages(); // Immediate fetch when returning to page
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [startPolling, fetchMessages]);

  // Handle window resize and sidebar state detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    // Detect sidebar state by checking the main content margin
    const detectSidebarState = () => {
      const mainContent = document.querySelector('[style*="margin-left"]') as HTMLElement;
      if (mainContent) {
        const marginLeft = mainContent.style.marginLeft;
        console.log('🔍 Sidebar state detection:', { marginLeft });
        if (marginLeft.includes('250px')) {
          console.log('📂 Sidebar expanded');
          setSidebarCollapsed(false);
        } else if (marginLeft.includes('60px')) {
          console.log('📁 Sidebar collapsed');
          setSidebarCollapsed(true);
        }
      }
    };

    // Initial detection
    detectSidebarState();

    // Set up observer to detect sidebar changes
    const observer = new MutationObserver(() => {
      detectSidebarState();
    });

    const mainContent = document.querySelector('[style*="margin-left"]');
    if (mainContent) {
      observer.observe(mainContent, { 
        attributes: true, 
        attributeFilter: ['style'] 
      });
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Initial load of chat history and setup
  useEffect(() => {
    const loadInitialMessages = async () => {
      await dispatch(fetchChatHistory());
      setIsInitialLoad(false);
      
      // Start polling after initial load
      startPolling();
    };
    
    // Request notification permission
    requestNotificationPermission();
    
    loadInitialMessages();

    // Cleanup on unmount
    return () => {
      stopPolling();
    };
  }, [dispatch, startPolling]);

  // Check if user is at bottom of chat
  const checkIfAtBottom = useCallback(() => {
    if (!chatContainerRef.current) return true;
    
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const threshold = 5; // Extremely strict threshold - only 5px
    const atBottom = scrollHeight - scrollTop - clientHeight < threshold;
    
    console.log('📍 Scroll position:', {
      scrollTop,
      scrollHeight,
      clientHeight,
      threshold,
      atBottom,
      difference: scrollHeight - scrollTop - clientHeight
    });
    
    setIsAtBottom(atBottom);
    return atBottom;
  }, []);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!chatContainerRef.current) return;
    
    const currentScrollTop = chatContainerRef.current.scrollTop;
    const scrollDirection = currentScrollTop < lastScrollTop.current ? 'up' : 'down';
    const atBottom = checkIfAtBottom();
    
    console.log('📜 handleScroll:', { 
      currentScrollTop, 
      lastScrollTop: lastScrollTop.current,
      scrollDirection, 
      atBottom, 
      userHasScrolledUp 
    });
    
    // Track if user has scrolled up from bottom
    if (Math.abs(currentScrollTop - lastScrollTop.current) > 3) { // Very sensitive to movement
      if (!atBottom) {
        console.log('👆 User NOT at bottom - setting userHasScrolledUp=true');
        setUserHasScrolledUp(true);
      } else {
        console.log('👇 User is at BOTTOM - setting userHasScrolledUp=false');
        setUserHasScrolledUp(false);
        // Hide new message popup when user scrolls to bottom
        if (showNewMessagePopup) {
          setShowNewMessagePopup(false);
          setNewMessageCount(0);
        }
      }
    }
    
    lastScrollTop.current = currentScrollTop;
  }, [checkIfAtBottom, showNewMessagePopup, userHasScrolledUp]);

  // Smart scroll to bottom (only if user is already at bottom)
  const scrollToBottom = useCallback((force = false) => {
    console.log('🔄 scrollToBottom called:', { force, isAtBottom, userHasScrolledUp });
    if (force || isAtBottom) {
      console.log('✅ SCROLLING TO BOTTOM');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setShowNewMessagePopup(false);
      setNewMessageCount(0);
    } else {
      console.log('❌ NOT scrolling - conditions not met');
    }
  }, [isAtBottom, userHasScrolledUp]);

  // Force scroll to bottom (for new message popup click)
  const forceScrollToBottom = () => {
    setUserHasScrolledUp(false);
    scrollToBottom(true);
  };

  // Track message count changes and handle new messages
  const prevMessageCount = useRef(messages.length);
  useEffect(() => {
    if (messages.length !== prevMessageCount.current) {
      const newCount = messages.length - prevMessageCount.current;
      console.log('📬 Message count changed:', prevMessageCount.current, '->', messages.length);
      
      if (newCount > 0 && !isInitialLoad) {
        // Check if the new messages are from other users (not current user)
        const newMessages = messages.slice(-newCount);
        const messagesFromOthers = newMessages.filter(msg => msg.user.id !== user?.id);
        const otherUsersMessageCount = messagesFromOthers.length;
        
        console.log('💬 NEW MESSAGE DECISION:', {
          totalNewCount: newCount,
          messagesFromOthers: otherUsersMessageCount,
          currentUserId: user?.id,
          newMessages: newMessages.map(m => ({ id: m.user.id, message: m.message.substring(0, 20) }))
        });
        
        // Only show popup for messages from other users
        if (otherUsersMessageCount > 0) {
          console.log('📍 NEW MESSAGES FROM OTHERS: Setting popup state');
          setNewMessageCount(prev => prev + otherUsersMessageCount);
          setShowNewMessagePopup(true);
        } else {
          console.log('📍 NEW MESSAGES FROM SELF: No popup needed');
        }
      }
      
      prevMessageCount.current = messages.length;
    }
  }, [messages.length, isInitialLoad, user]);

  // Initial scroll to bottom after first load (only on very first load)
  useEffect(() => {
    if (!isInitialLoad && messages.length > 0 && prevMessageCount.current === 0) {
      scrollToBottom(true);
      // Check initial position after a short delay
      setTimeout(() => {
        checkIfAtBottom();
      }, 100);
    }
  }, [isInitialLoad, messages.length, scrollToBottom, checkIfAtBottom]);

  const handleSendMessage = async (messageText: string) => {
    if (!user) return;

    const messagePayload = {
      conv_id: CHAT_CONV_ID,
      user_id: user.id,
      message: messageText,
      message_type: 'text' as const,
    };

    try {
      await dispatch(sendMessage(messagePayload)).unwrap();
      // Immediately refresh chat to show the new message
      setTimeout(() => {
        fetchMessages();
      }, 500); // Small delay to ensure backend has processed the message
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="h-100 d-flex flex-column">
      {/* Chat Header */}
      <div className="bg-white border-bottom p-3">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <i className="bi bi-chat-dots-fill text-primary fs-4 me-2"></i>
            <div>
              <h4 className="mb-0">General Chat</h4>
              <div className="d-flex align-items-center">
                <small className="text-muted me-2">Team communication hub</small>
                {isPolling ? (
                  <span className="badge bg-success rounded-pill connection-status">
                    <i className="bi bi-circle-fill me-1 live-indicator" style={{ fontSize: '0.5rem' }}></i>
                    Live
                  </span>
                ) : (
                  <span className="badge bg-warning text-dark rounded-pill connection-status">
                    <i className="bi bi-exclamation-triangle-fill me-1"></i>
                    Offline
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            {isFetching && (
              <small className="text-primary">
                <i className="bi bi-arrow-clockwise spinner-border spinner-border-sm me-1"></i>
                Updating...
              </small>
            )}
            {lastFetchTime && !isFetching && (
              <small className="text-muted">
                Last update: {lastFetchTime.toLocaleTimeString()}
              </small>
            )}
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={fetchMessages}
              title="Refresh chat"
              disabled={isFetching}
            >
              <i className={`bi ${isFetching ? 'bi-arrow-clockwise' : 'bi-arrow-clockwise'}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3">
          <ErrorAlert message={error} />
        </div>
      )}

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-grow-1 overflow-auto bg-light p-3 chat-messages position-relative" 
        style={{ 
          minHeight: '400px',
          paddingBottom: '120px' // Space for fixed chat input (approx 80px) + extra margin
        }}
        onScroll={handleScroll}
      >
        {loading && isInitialLoad ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <LoadingSpinner text="Loading chat history..." />
          </div>
        ) : messages.length === 0 ? (
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-center text-muted">
              <i className="bi bi-chat-square-text display-1 mb-3"></i>
              <h5>No messages yet</h5>
              <p>Be the first to start the conversation!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.chat_id} message={message} />
            ))}
            <div ref={messagesEndRef} style={{ height: '40px' }} />
            {/* Extra spacer to ensure last message is never hidden behind fixed input */}
            <div style={{ height: '80px' }} />
          </>
        )}

        {/* Scroll to Bottom Button - Always visible when user has scrolled up */}
        {userHasScrolledUp && !showNewMessagePopup && (
          <div 
            className="position-absolute bottom-0 end-0 mb-4 me-4"
            style={{ zIndex: 10 }}
          >
            <button
              className="btn btn-secondary rounded-circle shadow-lg p-2"
              onClick={forceScrollToBottom}
              title="Scroll to bottom"
              style={{
                width: '45px',
                height: '45px',
                animation: 'slideUp 0.3s ease-out',
              }}
            >
              <i className="bi bi-arrow-down"></i>
            </button>
          </div>
        )}
      </div>

      {/* Chat Input - Fixed to bottom */}
      <div 
        className="position-fixed bg-white"
        style={{
          bottom: 0,
          left: (() => {
            if (isMobile || isTablet) return '0';
            return sidebarCollapsed ? '60px' : '250px';
          })(), // Responsive to all screen sizes
          right: 0,
          zIndex: 1030, // Above other content but below modals
          borderTop: '1px solid #dee2e6'
        }}
      >
        <ChatInput onSendMessage={handleSendMessage} sending={sending} />
      </div>

      {/* New Message Popup - Fixed to viewport */}
      {showNewMessagePopup && (
        <div 
          className="position-fixed"
          style={{ 
            bottom: '100px', // Above the fixed chat input
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1050 // High z-index to appear above everything
          }}
        >
          <button
            className="btn btn-primary rounded-pill shadow-lg d-flex align-items-center px-4 py-2 new-message-popup"
            onClick={forceScrollToBottom}
            style={{
              animation: 'slideUp 0.3s ease-out',
              backdropFilter: 'blur(10px)',
              fontSize: '0.9rem',
            }}
          >
            <i className="bi bi-arrow-down me-2"></i>
            {newMessageCount === 1 ? (
              '1 new message'
            ) : (
              `${newMessageCount} new messages`
            )}
          </button>
        </div>
      )}
    </div>
  );
};