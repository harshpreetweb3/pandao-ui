import React from 'react';

const NotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl">Page Not Found</p>
        <p>The page you're looking for doesn't exist or has been moved.</p>
      </div>
    </div>
  );
};

export default NotFound;