import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import './layout.css';

const Layout: React.FC = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <div className="flex-grow-1 px-5 py-3 h-100">
        <Toaster position="top-right" />
        <Outlet />
      </div>
      <footer className="px-5 pt-3 border-top">
        <p className="text-muted">Copyright &copy; HOK Group 2023</p>
      </footer>
    </div>
  );
};

export default Layout;
