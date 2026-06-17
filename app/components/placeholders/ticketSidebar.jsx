import React, { useEffect, useState } from 'react';
import {
  FwAccordion,
  FwAccordionBody,
  FwAccordionTitle,
  FwInlineMessage,
  FwPill,
  FwSpinner,
  FwTooltip
} from '@freshworks/crayons/react';
import '../bootstrap/crayonsInit';
import '../../styles/themes.css';
import { renderPlaceholder } from './PlaceholderWrapper';

function TicketSidebar() {
  var [loading, setLoading] = useState(true);

  useEffect(function () {
    var timer = setTimeout(function () { setLoading(false); }, 600);
    try {
      window.client.instance.resize({ height: '420px' });
    } catch (e) {
      /* ignore */
    }
    return function () { clearTimeout(timer); };
  }, []);

  if (loading) {
    return (
      <div className="po-placeholder po-placeholder-highlight po-loading">
        <FwSpinner size="small" />
        <span className="po-subtle">Loading account context…</span>
      </div>
    );
  }

  return (
    <div className="po-placeholder po-placeholder-highlight">
      <div className="po-cta-row">
        <FwPill color="red">Renewal risk</FwPill>
        <FwTooltip content="Health score blends support load, NPS, and product adoption">
          <span className="po-subtle">Health 58</span>
        </FwTooltip>
      </div>
      <div className="po-settings-block">
        <FwInlineMessage type="warning">
          Brightline Health renews in 45 days with declining executive engagement.
        </FwInlineMessage>
      </div>
      <FwAccordion>
        <FwAccordionTitle>Recommended save actions</FwAccordionTitle>
        <FwAccordionBody>
          Schedule executive QBR, review open P1 backlog, and confirm success plan owner.
        </FwAccordionBody>
      </FwAccordion>
    </div>
  );
}

renderPlaceholder(TicketSidebar, 'ticket_sidebar');
