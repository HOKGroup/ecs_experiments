import React, { ReactNode } from 'react';
import { Variant } from 'react-bootstrap/types';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  children?: ReactNode | undefined;
}

const Jumbotron: React.FC<Props> = ({ children, ...props }) => {
  const bg = props.variant ? `bg-${props.variant}` : 'bg-primary';

  const className = `${props.className ?? ''} mt-4 p-5 ${bg} text-white rounded bg-gradient`;

  return <div className={className}>{children}</div>;
};

export default Jumbotron;
