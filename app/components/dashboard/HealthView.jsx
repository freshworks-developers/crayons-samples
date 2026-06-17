import React, { useState } from 'react';
import {
  FwAccordion,
  FwAccordionBody,
  FwAccordionTitle,
  FwButton,
  FwFormatDate,
  FwPill,
  FwPopover,
  FwTab,
  FwTabPanel,
  FwTabs,
  FwTag,
  FwTooltip
} from '@freshworks/crayons/react';
import { ACCOUNTS } from '../../data/mockData';

export default function HealthView() {
  var [segment, setSegment] = useState(0);

  return (
    <div className="po-page">
      <div className="po-page-header">
        <div>
          <h2 className="po-page-title">Customer health segments</h2>
          <p className="po-subtle">Drill into cohorts before churn risk becomes renewal friction.</p>
        </div>
      </div>

      <div className="po-card">
        <FwTabs activeTabIndex={segment} onFwChange={function (event) { setSegment(event.detail.tabIndex); }}>
          <FwTab slot="tab" panel="all" tab-header="All segments" />
          <FwTab slot="tab" panel="risk" tab-header="At risk" />
          <FwTab slot="tab" panel="champions" tab-header="Champions" />
          <FwTabPanel name="all">
            <SegmentList filter={function () { return true; }} />
          </FwTabPanel>
          <FwTabPanel name="risk">
            <SegmentList filter={function (account) { return account.churnRisk === 'High'; }} />
          </FwTabPanel>
          <FwTabPanel name="champions">
            <SegmentList filter={function (account) { return account.health >= 85; }} />
          </FwTabPanel>
        </FwTabs>
      </div>
    </div>
  );
}

function SegmentList({ filter }) {
  var accounts = ACCOUNTS.filter(filter);

  return (
    <div className="po-segment-list">
      {accounts.length === 0 ? (
        <p className="po-subtle">No accounts match this segment.</p>
      ) : null}
      {accounts.map(function (account) {
        return (
          <FwAccordion key={account.id} className="po-segment-item">
            <FwAccordionTitle>
              <div className="po-cta-row">
                <span>{account.name}</span>
                <FwTag text={account.churnRisk + ' risk'} color={account.churnRisk === 'High' ? 'red' : 'blue'} />
              </div>
            </FwAccordionTitle>
            <FwAccordionBody>
              <div className="po-tag-row">
                <FwPill color="blue">Health {account.health}</FwPill>
                <FwPill color="green">NPS {account.nps}</FwPill>
                <FwTooltip content="Renewal date for account planning">
                  <span>Renewal <FwFormatDate date={account.renewalDate} /></span>
                </FwTooltip>
                <FwPopover>
                  <FwButton slot="trigger" color="link">What changed?</FwButton>
                  <div slot="popover-content">
                    Support volume increased 18% and executive sponsor engagement dropped this quarter.
                  </div>
                </FwPopover>
              </div>
            </FwAccordionBody>
          </FwAccordion>
        );
      })}
    </div>
  );
}
