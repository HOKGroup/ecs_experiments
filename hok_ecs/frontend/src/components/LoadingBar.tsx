import React, { useCallback, useEffect, useState } from 'react';
import ProgressBar, { ProgressBarProps } from 'react-bootstrap/ProgressBar';
import './loadingBar.css';

type Props = {
  loading: boolean;
} & ProgressBarProps;

const INTERVAL = 50;
const INCREMENT = 10;
const MAX = 90;

const LoadingBar: React.FC<Props> = ({ loading, ...props }) => {
  const [now, setNow] = useState(0);
  const [intervalInstance, setIntervalInstance] = useState(undefined as number | undefined);

  const clearIntervalInstance = useCallback(() => {
    if (intervalInstance) {
      window.clearInterval(intervalInstance);
    }
  }, [intervalInstance]);

  useEffect(() => {
    if (loading) {
      const interval = window.setInterval(() => {
        setNow((n) => {
          const newNow = Math.min(n + INCREMENT, MAX);
          if (newNow >= MAX) clearIntervalInstance();

          return newNow;
        });
      }, INTERVAL);

      setIntervalInstance(interval);
    }

    return () => {
      clearIntervalInstance();
    };
  }, [loading]);

  if (loading) {
    return (
      <ProgressBar
        {...props}
        className={`${props.className ?? ''} loading-bar__progress-bar`}
        variant="info"
        now={now}
      />
    );
  }

  return null;
};

export default LoadingBar;
