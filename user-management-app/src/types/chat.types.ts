export interface SendMessagePayload {
  conv_id: string;
  user_id: number;
  message: string;
  message_type: 'text';
}

export interface ChatMessage {
  chat_id: number;
  conv_id: string;
  message: string;
  message_type: string;
  chat_date: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    userRole: string;
    is_deleted: boolean;
  };
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sending: boolean;
}

export interface ChatResponse {
  message: string;
  conv_id: string;
  total_messages: number;
  chat_history: ChatMessage[];
}