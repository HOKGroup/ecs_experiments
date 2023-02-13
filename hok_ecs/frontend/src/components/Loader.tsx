import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

const DELAY = 500;

interface Props {
  loading: boolean;
  loadingComponent: React.ReactNode;
}

const Loader: React.FC<PropsWithChildren<Props>> = ({
  loading,
  loadingComponent,
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
  }, [loading]);

  if (loading || !isExpired) {
    return <>{loadingComponent}</>;
  }

  return <>{children}</>;
};

export default Loader;
