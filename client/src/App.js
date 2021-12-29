import EmptyPage from 'components/pages/EmptyPage';
import EquipmentPage from 'components/pages/EquipmentPage';
import LoginPage from 'components/pages/LoginPage';
import MainPage from 'components/pages/MainPage';
import MonitoringDetailPage from 'components/pages/MonitoringDetailPage';
import MonitoringPage from 'components/pages/MonitoringPage';
import NoticeDetail from 'components/pages/NoticeDetail';
import NoticePage from 'components/pages/NoticePage';
import NoticeUpdate from 'components/pages/NoticeUpdate';
import ProjectPage from 'components/pages/ProjectPage';
import WorkerPage from 'components/pages/WorkerPage';
import Write from 'components/pages/Write';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/monitoring" element={<MonitoringPage />} />
      <Route path="/monitordetail" element={<MonitoringDetailPage />} />
      <Route path="/notice" element={<NoticePage />} />
      <Route path="/write" element={<Write />} />
      <Route path="/notice/:id" element={<NoticeDetail />} />
      <Route path="/notice/:id/update" element={<NoticeUpdate />} />
      <Route path="/equipment" element={<EquipmentPage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/worker" element={<WorkerPage />} />
      <Route path="*" element={<EmptyPage />} />
    </Routes>
  );
}

export default App;
