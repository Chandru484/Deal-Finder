
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="relative">
            <div className="w-16 h-16 border-4 border-cyan-400 border-solid rounded-full animate-pulse-fast"></div>
            <div className="w-16 h-16 border-4 border-slate-700 border-solid rounded-full absolute top-0 left-0 animate-spin"></div>
        </div>
        <p className="mt-4 text-lg font-semibold text-slate-300">Searching for the best deals...</p>
        <p className="text-slate-400">Our AI is on the hunt!</p>
    </div>
  );
};

export default Loader;
