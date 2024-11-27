import React from 'react';
import { Outlet } from 'react-router-dom';

function MainContent() {
  return (
    <main className="app-main">
      <Outlet />
    </main>
  );
}

export default MainContent;
