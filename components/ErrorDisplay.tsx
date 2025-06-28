
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="max-w-3xl mx-auto my-8 p-4 bg-red-900/50 border border-red-700 text-red-200 rounded-lg shadow-lg text-center">
      <h3 className="font-bold text-lg mb-2">Oops! Something went wrong.</h3>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
