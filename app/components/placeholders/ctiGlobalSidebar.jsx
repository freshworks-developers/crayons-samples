import React, { useState } from 'react';
import { FwButton, FwButtonGroup, FwIcon, FwToggle } from '@freshworks/crayons/react';
import '../bootstrap/crayonsInit';
import '../../styles/themes.css';
import { QUEUE_STATS } from '../../data/mockData';
import { renderPlaceholder } from './PlaceholderWrapper';

function CtiGlobalSidebar() {
  var [liveMode, setLiveMode] = useState(true);

  return (
    <div className="po-placeholder">
      <div className="po-cta-row">
        <strong>Voice queue pulse</strong>
        <FwToggle checked={liveMode} onFwChange={function (event) { setLiveMode(event.detail.checked); }}>
          Live updates
        </FwToggle>
      </div>
      <div className="po-queue-stats">
        <div className="po-queue-stat">
          <FwIcon name="phone" />
          <span>Waiting {QUEUE_STATS.waiting}</span>
        </div>
        <div className="po-queue-stat">
          <FwIcon name="agent" />
          <span>Active {QUEUE_STATS.active}</span>
        </div>
      </div>
      <div className="po-subtle">Avg handle time {QUEUE_STATS.avgHandle}</div>
      <div className="po-settings-block">
        <FwButtonGroup>
          <FwButton color="secondary">Pause routing</FwButton>
          <FwButton color="primary">Escalate to lead</FwButton>
        </FwButtonGroup>
      </div>
    </div>
  );
}

renderPlaceholder(CtiGlobalSidebar, 'cti_global_sidebar');
