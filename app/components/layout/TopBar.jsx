import React from 'react';
import {
  FwAvatar,
  FwButton,
  FwIcon,
  FwPopover,
  FwSelect,
  FwSelectOption
} from '@freshworks/crayons/react';
import { useTheme } from '../../context/ThemeContext';

var THEME_LABELS = {
  light: 'Light',
  dark: 'Dark',
  midnight: 'Midnight'
};

export default function TopBar() {
  var themeCtx = useTheme();

  return (
    <header className="po-topbar">
      <div className="po-topbar-brand">
        <FwIcon name="pulse" size={22} color="var(--po-accent)" />
        <div>
          <div className="po-brand">PulseOps</div>
          <div className="po-subtle">Customer success intelligence</div>
        </div>
      </div>

      <div className="po-topbar-actions">
        <FwSelect
          value="all"
          placeholder="Portfolio"
          style={{ minWidth: '160px' }}
        >
          <FwSelectOption value="all">All accounts</FwSelectOption>
          <FwSelectOption value="enterprise">Enterprise</FwSelectOption>
          <FwSelectOption value="growth">Growth</FwSelectOption>
        </FwSelect>

        <FwSelect
          value={themeCtx.theme}
          placeholder="Theme"
          onFwChange={function (event) {
            themeCtx.setTheme(event.detail.value);
          }}
          style={{ minWidth: '130px' }}
        >
          {themeCtx.themes.map(function (item) {
            return (
              <FwSelectOption key={item} value={item}>
                {THEME_LABELS[item] || item}
              </FwSelectOption>
            );
          })}
        </FwSelect>

        <FwPopover placement="bottom-end">
          <FwButton slot="trigger" color="secondary" className="po-profile-trigger">
            <FwAvatar name="Jordan Lee" size="small" slot="before-label" />
            Jordan Lee
          </FwButton>
          <div slot="popover-content" className="po-profile-menu">
            <FwButton color="link">My profile</FwButton>
            <FwButton color="link">Sign out</FwButton>
          </div>
        </FwPopover>
      </div>
    </header>
  );
}
