import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LoadingSpinner: React.FC<Props> = (props) => {
  const size = props.size ?? 300;
  const styleSize = `${size}px`;

  const style = { width: styleSize, height: styleSize };

  let className = `${
    props.className ?? ''
  } w-100 d-flex justify-content-center align-items-center`;

  if (!props.style?.height) {
    className += ' h-100';
  }

  return (
    <div {...props} className={className}>
      <Spinner style={style} animation="border" />
    </div>
  );
};

export default LoadingSpinner;
