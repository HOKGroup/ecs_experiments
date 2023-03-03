import React, { ReactNode } from 'react';

interface Props {
  enabled: boolean;
  children?: ReactNode | undefined;
}

const CursorToggle: React.FC<Props> = ({ enabled, children }) => {
  if (enabled) return <>{children}</>;

  return <span className="cursor-not-allowed">{children}</span>;
};

export default CursorToggle;
