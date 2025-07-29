import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { LoadingSpinner } from '../../../common/components/LoadingSpinner';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  sending: boolean;
}

export const ChatInput = ({ onSendMessage, sending }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || sending) return;
    
    try {
      await onSendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`bg-white ${isMobile ? 'p-2' : 'p-3'}`}>
      <form onSubmit={handleSubmit}>
        <div className={`d-flex align-items-end ${isMobile ? 'gap-1' : 'gap-2'}`}>
          {/* User Avatar - Hide on very small screens */}
          {!isMobile && (
            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
              <span className="text-white fw-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </span>
            </div>
          )}
          
          {/* Message Input */}
          <div className="flex-grow-1">
            <textarea
              className={`form-control ${isMobile ? 'form-control-sm' : ''}`}
              rows={1}
              placeholder={isMobile ? "Type message..." : "Type your message... (Press Enter to send, Shift+Enter for new line)"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending}
              style={{ 
                resize: 'none', 
                minHeight: isMobile ? '36px' : '40px',
                fontSize: isMobile ? '14px' : '16px'
              }}
            />
          </div>
          
          {/* Send Button */}
          <button
            type="submit"
            className={`btn btn-primary ${isMobile ? 'btn-sm px-2' : 'px-3'}`}
            disabled={!message.trim() || sending}
          >
            {sending ? (
              <LoadingSpinner size="sm" />
            ) : (
              <i className="bi bi-send"></i>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};