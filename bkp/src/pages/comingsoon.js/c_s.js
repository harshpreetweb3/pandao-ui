import React from 'react';
import { Link } from "react-router-dom";

// Define your ComingSoon component
const ComingSoon = () => {
  // Style for the container with Tailwind CSS classes
  const containerStyle = `flex flex-col items-center justify-center w-full h-screen bg-custom-purple text-white`;
  const buttonStyle = `bg-white text-custom-purple font-semibold py-2 px-4 border border-transparent rounded-md shadow-sm text-sm hover:bg-gray-100`;

  return (
    <div className={containerStyle}>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Coming Soon</h1>
        <p className="text-xl mb-4">We're working hard to finish the development of this Product.</p>
        <p className="text-lg">Stay tuned for updates. Thank you for your patience!</p>
      </div>
      <Link to='/'>
          <button className={buttonStyle}>
           <span className='text-black'>Back to home page</span> 
          </button>
        </Link>
     
    </div>
  );
};

export default ComingSoon;