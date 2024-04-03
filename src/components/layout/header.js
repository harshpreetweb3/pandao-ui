import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Replace the span with your logo or icon */}
        <span className="text-xl font-bold"><Link to='/'><img src="https://i.postimg.cc/4xC2vGYG/icon.jpg"  style={{ width: '60px', height: '60px' }} alt='image'/></Link>Pan-DAO</span>
        <nav>
          <ul className="flex space-x-4">
            <li className="hover:underline hover:underline-offset-4 transition-all duration-300">
              <Link to='/' className='text-cyan-900'>About Us</Link>
            </li>
            <li className="hover:underline hover:underline-offset-4 transition-all duration-300">
              <Link to='contact-us' className='text-cyan-900'>Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Link to='/login' className="text-cyan-900 hover:underline hover:underline-offset-4 transition-all duration-300">
        Login
        </Link>
      </div>
    </header>
  );
};

export default Header;
