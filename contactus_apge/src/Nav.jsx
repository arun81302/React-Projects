import React from "react";

const Nav = () => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 w-[92%] max-w-6xl items-center justify-between">

        
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
        </div>

        
        <div className="flex items-center gap-4 text-sm font-medium sm:gap-8 sm:text-base">
          <a href="#" className="transition hover:text-gray-500">
            Home
          </a>

          <a href="#" className="transition hover:text-gray-500">
            About
          </a>

          <a href="#" className="transition hover:text-gray-500">
            Contact
          </a>
        </div>

      
        <button className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white transition hover:bg-gray-800 sm:px-5 sm:text-sm">
          Get Started
        </button>

      </div>
    </nav>
  );
};

export default Nav;