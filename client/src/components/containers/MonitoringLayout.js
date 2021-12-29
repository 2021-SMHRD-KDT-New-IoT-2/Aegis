import React from 'react';
import Alert from './Alert';
import Header from './Header';

function MonitoringLayout({ children }) {
  return (
    <div className="flex flex-col flex-wrap w-full h-screen bg-black bg-opacity-90 font-nanum-regular">
      <Header />
      {children}
      <Alert />
    </div>
  );
}

export default MonitoringLayout;
