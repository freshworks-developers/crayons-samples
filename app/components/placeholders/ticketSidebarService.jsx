import React from 'react';
import { FwInlineMessage } from '@freshworks/crayons/react';
import '../bootstrap/crayonsInit';
import '../../styles/themes.css';
import { renderPlaceholder } from './PlaceholderWrapper';

function TicketSidebarService() {
  return (
    <div className="po-placeholder">
      <FwInlineMessage type="info">
        PulseOps ITSM context is available in the full PulseOps dashboard for this workspace.
      </FwInlineMessage>
    </div>
  );
}

renderPlaceholder(TicketSidebarService, 'service_ticket_sidebar');
