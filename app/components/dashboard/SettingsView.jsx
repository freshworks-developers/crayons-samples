import React, { useState } from 'react';
import {
  FwButton,
  FwCountryPhone,
  FwInput,
  FwListOptions,
  FwMenu,
  FwMenuItem,
  FwSelect,
  FwSelectOption,
  FwTextarea,
  FwTimepicker,
  FwToggle,
  FwToggleGroup,
  FwToggleGroupButton
} from '@freshworks/crayons/react';
import { NESTED_REGIONS } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';

var THEME_LABELS = {
  light: 'Light',
  dark: 'Dark',
  midnight: 'Midnight'
};

export default function SettingsView() {
  var themeCtx = useTheme();
  var [digest, setDigest] = useState('08:30');
  var [smsAlerts, setSmsAlerts] = useState(true);
  var [notes, setNotes] = useState('Notify CSM pod when enterprise health drops below 60.');

  return (
    <div className="po-page">
      <div className="po-page-header">
        <div>
          <h2 className="po-page-title">Workspace settings</h2>
          <p className="po-subtle">Configure how PulseOps alerts your customer success team.</p>
        </div>
      </div>

      <div className="po-two-col">
        <div className="po-card">
          <h3 className="po-section-title">Appearance</h3>
          <FwSelect
            label="Dashboard theme"
            value={themeCtx.theme}
            onFwChange={function (event) { themeCtx.setTheme(event.detail.value); }}
          >
            {themeCtx.themes.map(function (item) {
              return (
                <FwSelectOption key={item} value={item}>
                  {THEME_LABELS[item] || item}
                </FwSelectOption>
              );
            })}
          </FwSelect>
          <div className="po-settings-block">
            <FwToggleGroup value={themeCtx.theme} onFwChange={function (event) { themeCtx.setTheme(event.detail.value); }}>
              <FwToggleGroupButton value="light">Light</FwToggleGroupButton>
              <FwToggleGroupButton value="dark">Dark</FwToggleGroupButton>
              <FwToggleGroupButton value="midnight">Midnight</FwToggleGroupButton>
            </FwToggleGroup>
          </div>
        </div>

        <div className="po-card">
          <h3 className="po-section-title">Notifications</h3>
          <FwToggle checked={smsAlerts} onFwChange={function (event) { setSmsAlerts(event.detail.checked); }}>
            SMS alerts for renewal risk
          </FwToggle>
          {smsAlerts ? (
            <>
              <div className="po-settings-block">
                <FwCountryPhone label="Alert mobile number" value="+14155550100" />
              </div>
              <div className="po-settings-block">
                <FwTimepicker label="Daily digest time" value={digest} onFwChange={function (event) { setDigest(event.detail.value); }} />
              </div>
            </>
          ) : null}
          <div className="po-settings-block">
            <FwInput label="Escalation inbox" value="cs-leads@pulseops.test" />
          </div>
        </div>
      </div>

      <div className="po-card">
        <h3 className="po-section-title">Regional routing</h3>
        <FwSelect label="Primary region" placeholder="Select region" value="na">
          {NESTED_REGIONS.map(function (region) {
            return (
              <FwSelectOption key={region.value} value={region.value}>{region.label}</FwSelectOption>
            );
          })}
          {NESTED_REGIONS.flatMap(function (region) {
            return region.children.map(function (child) {
              return (
                <FwSelectOption key={child.value} value={child.value}>
                  {region.label + ' — ' + child.label}
                </FwSelectOption>
              );
            });
          })}
        </FwSelect>
        <div className="po-settings-block">
          <FwListOptions
            label="Alert channels"
            values={JSON.stringify(['email', 'slack'])}
            options={JSON.stringify([
              { value: 'email', text: 'Email' },
              { value: 'slack', text: 'Slack' },
              { value: 'sms', text: 'SMS' }
            ])}
          />
        </div>
      </div>

      <div className="po-card">
        <h3 className="po-section-title">Team playbook notes</h3>
        <FwTextarea
          label="Internal guidance"
          value={notes}
          rows={4}
          onFwInput={function (event) { setNotes(event.detail.value); }}
        />
        <div className="po-cta-row">
          <div>
            <div className="po-subtle">Workspace quick actions</div>
            <FwMenu className="po-menu-panel">
              <FwMenuItem>Manage members</FwMenuItem>
              <FwMenuItem>View audit log</FwMenuItem>
            </FwMenu>
          </div>
          <FwButton color="primary">Save settings</FwButton>
        </div>
      </div>
    </div>
  );
}
