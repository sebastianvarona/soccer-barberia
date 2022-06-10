import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
export default function Layout({ children }) {
  return (
    <div className="p-8 grid grid-cols-6 max-w-7xl mx-auto min-h-screen">
      <div className="col-span-2 flex justify-center flex-col">
        <Sidebar />
      </div>
      <div className="col-span-4 flex justify-center flex-col">{children}</div>
    </div>
  );
}
