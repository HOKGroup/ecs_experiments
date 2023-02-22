import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

interface Props {
  error: Error;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  useEffect(() => {
    console.warn(error);
  }, [error]);

  return (
    <div className="h-100 w-100">
      <Alert variant="danger">Something went wrong.</Alert>
    </div>
  );
};

export default ErrorMessage;
