import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const LoadingSpinner: React.FC<Props> = (props) => {
  const size = props.size ?? 300;
  const styleSize = `${size}px`;

  const style = { width: styleSize, height: styleSize };

  const className = classNames(
    props.className,
    'w-100 d-flex justify-content-center align-items-center',
    {
      'h-100': !props.style?.height,
    },
  );

  return (
    <div {...props} className={className}>
      <Spinner style={style} animation="border" />
    </div>
  );
};

export default LoadingSpinner;
