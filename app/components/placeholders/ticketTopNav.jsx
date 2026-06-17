import React from 'react';
import { FwButton, FwIcon, FwPill, FwTag } from '@freshworks/crayons/react';
import '../bootstrap/crayonsInit';
import '../../styles/themes.css';
import { renderPlaceholder } from './PlaceholderWrapper';

function TicketTopNav() {
  return (
    <div className="po-placeholder po-tag-row">
      <FwTag text="At-risk account" color="red" />
      <FwPill color="yellow">Renewal in 45 days</FwPill>
      <span className="po-subtle">PulseOps flagged Brightline Health for CSM review.</span>
      <FwButton color="link">
        <FwIcon name="arrow-right" slot="before-label" />
        Open account plan
      </FwButton>
    </div>
  );
}

renderPlaceholder(TicketTopNav, 'ticket_top_navigation');
