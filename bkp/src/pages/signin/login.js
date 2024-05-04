import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Logging in with:', username, password);
  };

  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    console.log('Continuing with Google');
  };

  const handleRegister = () => {
    // Placeholder for registration logic
    console.log('Navigating to registration page');
    // navigate('/register'); // Uncomment and use the correct path to navigate to your registration page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10">
        <div className="grid place-items-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 rounded bg-gray-200 text-gray-900"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-200 text-gray-900"
            required
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full p-3 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Continue with Google
          </button>
          <div className="text-center">
            <button
              type="button"
              onClick={handleRegister}
              className="text-blue-600 hover:text-blue-800"
            >
              Don't have an id yet? Register for free
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;