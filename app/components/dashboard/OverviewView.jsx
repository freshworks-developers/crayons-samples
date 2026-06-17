import React, { useState } from 'react';
import {
  FwButton,
  FwFormatNumber,
  FwIcon,
  FwInlineMessage,
  FwPill,
  FwProgressLoader,
  FwSkeleton,
  FwSpinner,
  ToastController
} from '@freshworks/crayons/react';
import { ACTIVITY, NPS_HISTORY, PORTFOLIO_KPIS } from '../../data/mockData';

var NPS_MAX = Math.max.apply(null, NPS_HISTORY.map(function (point) {
  return point.value;
}));

export default function OverviewView() {
  var [refreshing, setRefreshing] = useState(false);

  function refreshPortfolio() {
    setRefreshing(true);
    setTimeout(function () {
      setRefreshing(false);
      ToastController.trigger({
        type: 'success',
        content: 'Portfolio metrics refreshed for your renewal cohort.'
      });
    }, 900);
  }

  return (
    <div className="po-page">
      <div className="po-page-header">
        <div>
          <h2 className="po-page-title">Executive overview</h2>
          <p className="po-subtle">Monitor renewal risk and portfolio health in one place.</p>
        </div>
        <FwButton color="primary" onClick={refreshPortfolio} disabled={refreshing}>
          {refreshing ? 'Refreshing…' : 'Refresh metrics'}
        </FwButton>
      </div>

      {refreshing ? (
        <div className="po-loader-row">
          <FwProgressLoader />
        </div>
      ) : null}

      <div className="po-kpi-grid">
        <div className="po-kpi-card">
          <div className="po-subtle">Average health</div>
          <div className="po-kpi-value">
            <FwFormatNumber value={PORTFOLIO_KPIS.avgHealth} />%
          </div>
          <FwPill color="green">+4 vs last month</FwPill>
        </div>
        <div className="po-kpi-card">
          <div className="po-subtle">At-risk accounts</div>
          <div className="po-kpi-value">
            <FwFormatNumber value={PORTFOLIO_KPIS.atRiskAccounts} />
          </div>
          <FwPill color="red">Needs CSM review</FwPill>
        </div>
        <div className="po-kpi-card">
          <div className="po-subtle">Open escalations</div>
          <div className="po-kpi-value">
            <FwFormatNumber value={PORTFOLIO_KPIS.openEscalations} />
          </div>
          <FwPill color="yellow">Support backlog</FwPill>
        </div>
        <div className="po-kpi-card">
          <div className="po-subtle">Portfolio NPS</div>
          <div className="po-kpi-value">
            <FwFormatNumber value={PORTFOLIO_KPIS.avgNps} />
          </div>
          <FwPill color="blue">Promoter trend</FwPill>
        </div>
      </div>

      <FwInlineMessage type="warning" closable>
        Brightline Health enters a 45-day renewal window with a declining health score.
      </FwInlineMessage>

      <div className="po-two-col">
        <div className="po-card">
          <h3 className="po-section-title">NPS trend</h3>
          <p className="po-subtle po-section-desc">Rolling six-month promoter score across active accounts.</p>
          <div className="po-bar-chart">
            {NPS_HISTORY.map(function (point) {
              var height = Math.round((point.value / NPS_MAX) * 100);
              return (
                <div key={point.label} className="po-bar-chart-item">
                  <div
                    className="po-bar-chart-bar"
                    style={{ height: Math.max(16, height) + 'px' }}
                    title={point.label + ': ' + point.value}
                  />
                  <span className="po-bar-chart-label">{point.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="po-card">
          <h3 className="po-section-title">Recent signals</h3>
          <p className="po-subtle po-section-desc">Latest health, support, and renewal activity.</p>
          <ul className="po-signal-list">
            {ACTIVITY.map(function (item) {
              return (
                <li key={item.id} className="po-signal-item">
                  <FwIcon name="info" size={14} color="var(--po-accent)" />
                  <div>
                    <div className="po-signal-text">{item.text}</div>
                    <div className="po-subtle">{item.time}</div>
                  </div>
                </li>
              );
            })}
          </ul>
          {refreshing ? (
            <div className="po-signal-loading">
              <FwSpinner size="small" />
              <span className="po-subtle">Updating signals…</span>
            </div>
          ) : (
            <FwSkeleton variant="rect" height="8px" width="40%" />
          )}
        </div>
      </div>
    </div>
  );
}
