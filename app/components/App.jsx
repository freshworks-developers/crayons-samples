import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { FwToast, FwToastMessage } from '@freshworks/crayons/react';
import DashboardShell from './layout/DashboardShell';
import OverviewView from './dashboard/OverviewView';
import AccountsView from './dashboard/AccountsView';
import HealthView from './dashboard/HealthView';
import PlaybooksView from './dashboard/PlaybooksView';
import ReportsView from './dashboard/ReportsView';
import SettingsView from './dashboard/SettingsView';

export default function App() {
  return (
    <>
      <DashboardShell>
        <Routes>
          <Route path="/" element={<OverviewView />} />
          <Route path="/accounts" element={<AccountsView />} />
          <Route path="/health" element={<HealthView />} />
          <Route path="/playbooks" element={<PlaybooksView />} />
          <Route path="/reports" element={<ReportsView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DashboardShell>
      <FwToast id="pulseops-toast" position="top-center">
        <FwToastMessage type="success" timeout={4000} />
      </FwToast>
    </>
  );
}
