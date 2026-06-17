import React from 'react';
import {
  FwButton,
  FwFormatNumber,
  FwPopover,
  FwRadio,
  FwRadioGroup
} from '@freshworks/crayons/react';
import '../bootstrap/crayonsInit';
import '../../styles/themes.css';
import { renderPlaceholder } from './PlaceholderWrapper';

function CompanySidebar() {
  return (
    <div className="po-placeholder po-placeholder-highlight">
      <h3 className="po-section-title">Summit Finance</h3>
      <p className="po-subtle">Enterprise · 88 seats active</p>
      <div className="po-settings-block">
        Monthly recurring revenue: <strong><FwFormatNumber value={15400} /></strong>
      </div>
      <FwRadioGroup name="successTier" value="premium">
        <FwRadio value="standard">Standard success</FwRadio>
        <FwRadio value="premium">Premium success</FwRadio>
      </FwRadioGroup>
      <div className="po-settings-block">
        <FwPopover>
          <FwButton slot="trigger" color="link">Usage vs plan</FwButton>
          <div slot="popover-content">
            Seat utilization is at 92%. Recommend expansion conversation in Q3 business review.
          </div>
        </FwPopover>
      </div>
    </div>
  );
}

renderPlaceholder(CompanySidebar, 'company_sidebar');
