import React from 'react';
import Alert from './Alert';
import Header from './Header';

function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col flex-wrap w-full h-screen bg-[#f5f6f7] font-nanum-regular">
      <Header />
      {children}
      <Alert />
    </div>
  );
}

export default DefaultLayout;
