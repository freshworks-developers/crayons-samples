import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FwTab, FwTabs } from '@freshworks/crayons/react';
import TopBar from './TopBar';

var NAV = [
  { path: '/', label: 'Overview' },
  { path: '/accounts', label: 'Accounts' },
  { path: '/health', label: 'Health' },
  { path: '/playbooks', label: 'Playbooks' },
  { path: '/reports', label: 'Reports' },
  { path: '/settings', label: 'Settings' }
];

function routeToIndex(pathname) {
  var idx = NAV.findIndex(function (item) {
    return item.path === pathname;
  });
  return idx >= 0 ? idx : 0;
}

export default function DashboardShell({ children }) {
  var location = useLocation();
  var navigate = useNavigate();
  var activeIndex = routeToIndex(location.pathname);

  return (
    <div className="po-shell">
      <TopBar />
      <div className="po-main">
        <div className="po-content">
          <FwTabs
            activeTabIndex={activeIndex}
            onFwChange={function (event) {
              var index = event.detail.tabIndex;
              if (NAV[index]) {
                navigate(NAV[index].path);
              }
            }}
          >
            {NAV.map(function (item) {
              return <FwTab key={item.path} tab-header={item.label} />;
            })}
          </FwTabs>
          <div className="po-view">{children}</div>
        </div>
      </div>
    </div>
  );
}
