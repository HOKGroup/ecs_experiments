import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import ErrorMessage from './ErrorMessage';

const DELAY = 250;

interface Props {
  loading: boolean;
  error?: Error;
  errorComponent?: React.ReactNode;
  loadingComponent: React.ReactNode;
}

const Loader: React.FC<PropsWithChildren<Props>> = ({
  loading,
  loadingComponent,
  error,
  errorComponent,
  children,
}) => {
  const [isExpired, setIsExpired] = useState(true);
  const [timeoutInstance, setTimeoutInstance] = useState(
    undefined as number | undefined,
  );

  const clearTimeoutInstance = useCallback(() => {
    if (timeoutInstance) window.clearTimeout(timeoutInstance);
  }, [timeoutInstance]);

  useEffect(() => {
    if (loading) {
      setIsExpired(false);

      const timeout = window.setTimeout(() => {
        setIsExpired(true);
      }, DELAY);

      setTimeoutInstance(timeout);
    }

    return clearTimeoutInstance;
  }, [loading]);

  if (loading || !isExpired) {
    return <>{loadingComponent}</>;
  }

  if (error) {
    return errorComponent ? (
      <>{errorComponent}</>
    ) : (
      <ErrorMessage error={error} />
    );
  }

  return <>{children}</>;
};

export default Loader;
