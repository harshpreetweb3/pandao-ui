import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-20">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src="https://i.postimg.cc/4xC2vGYG/icon.jpg" alt="Logo" className="mr-3 h-8" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">PAN-DAO</span>
            </a>
            <p className="mt-2">Innovating one project at a time.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Quick Links</h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <a href="/about" className="hover:underline">About Us</a>
                </li>
                <li className="mb-4">
                  <a href="/services" className="hover:underline">Services</a>
                </li>
                <li className="mb-4">
                  <a href="/portfolio" className="hover:underline">Portfolio</a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
              <ul className="text-gray-400">
                <li className="mb-4">
                  <a href="/terms" className="hover:underline">Terms of Use</a>
                </li>
                <li className="mb-4">
                  <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </li>
                <li>
                  <a href="/cookies" className="hover:underline">Cookie Policy</a>
                </li>
              </ul>
            </div>
            {/* Add more columns as needed */}
          </div>
        </div>
        <div className="mt-10 md:mt-20 border-t border-gray-700 pt-10 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-gray-400">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
          <div className="flex mt-4 md:m-0">
            {/* Replace with your social media URLs */}
            <a href="#" className="text-gray-400 hover:text-white mr-6">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white mr-6">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white mr-6">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
