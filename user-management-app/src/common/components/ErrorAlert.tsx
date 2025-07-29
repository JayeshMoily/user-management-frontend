interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorAlert = ({ message, onDismiss, className = '' }: ErrorAlertProps) => {
  return (
    <div className={`alert alert-danger alert-dismissible ${className}`} role="alert">
      {message}
      {onDismiss && (
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onDismiss}
        ></button>
      )}
    </div>
  );
};