import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface Props {
  size?: number;
}

const LoadingSpinner: React.FC<Props> = (props) => {
  const size = props.size || 300;
  const styleSize = `${size}px`;

  const style = { width: styleSize, height: styleSize };

  return (
    <div className="h-100 w-100 d-flex justify-content-center align-items-center">
      <Spinner style={style} animation="border" />
    </div>
  );
};

export default LoadingSpinner;
