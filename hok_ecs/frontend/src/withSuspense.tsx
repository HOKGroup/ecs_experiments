import React, { Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

/**
 * HOC to wrap a component in a Suspense component.
 */

export default function withSuspense<P>(Component: React.ComponentType<P>) {
  return function WithSuspense(props: React.PropsWithChildren<P>) {
    return (
      <Suspense
        fallback={
          <LoadingSpinner className="pt-5" style={{ height: '66vh' }} />
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}
