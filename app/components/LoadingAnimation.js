import React from 'react';

const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="mb-4 text-2xl font-semibold text-gray-900 animate-pulse">
        ICREP TC Generator Loading
        <span className="dots">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </span>
      </h2>      
    </div>
  );
};

export default LoadingAnimation;