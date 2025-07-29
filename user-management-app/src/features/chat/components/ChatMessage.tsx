import type { ChatMessage as ChatMessageType } from '../../../types/chat.types';
import { useAuth } from '../../../hooks/useAuth';
import { formatChatTime } from '../../../utils/dateFormatter';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { user: currentUser } = useAuth();
  const isCurrentUser = currentUser?.id === message.user.id;
  const isDeletedUser = message.user.is_deleted;

  const messageStyles = isCurrentUser
    ? 'bg-primary text-white ms-auto'
    : isDeletedUser
    ? 'bg-secondary text-muted opacity-50'
    : 'bg-light text-dark';

  const userName = isDeletedUser ? 'Unknown User' : `${message.user.firstName} ${message.user.lastName}`;

  return (
    <div className={`d-flex mb-3 ${isCurrentUser ? 'justify-content-end' : 'justify-content-start'}`}>
      <div className={`rounded p-3 ${messageStyles}`} style={{ maxWidth: '70%' }}>
        {/* Message Header */}
        <div className="d-flex align-items-center justify-content-between mb-1">
          <small className={`fw-semibold ${isCurrentUser ? 'text-white-50' : 'text-muted'}`}>
            {userName}
          </small>
          <small className={`ms-2 ${isCurrentUser ? 'text-white-50' : 'text-muted'}`}>
            {formatChatTime(message.chat_date)}
          </small>
        </div>
        
        {/* Message Content */}
        <div className="message-content">
          {message.message}
        </div>
        
        {/* User Role Badge (for non-current users) */}
        {!isCurrentUser && !isDeletedUser && (
          <div className="mt-2">
            <span className={`badge ${message.user.userRole === 'admin' ? 'bg-warning text-dark' : 'bg-info'} rounded-pill`}>
              {message.user.userRole}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};