import React, { useMemo, useState } from 'react';
import {
  FwCustomCellAnchor,
  FwCustomCellIcon,
  FwCustomCellParagraph,
  FwCustomCellUser,
  FwDataTable,
  FwDatepicker,
  FwInput,
  FwKebabMenu,
  FwPagination,
  FwPill,
  FwSelect,
  FwSelectOption,
  FwTag,
  FwToggleGroup,
  FwToggleGroupButton
} from '@freshworks/crayons/react';
import { ACCOUNTS } from '../../data/mockData';

var COLUMNS = [
  { key: 'name', text: 'Account' },
  { key: 'owner', text: 'CSM' },
  { key: 'tier', text: 'Tier' },
  { key: 'health', text: 'Health' },
  { key: 'churnRisk', text: 'Churn risk' },
  { key: 'mrr', text: 'MRR' }
];

var PER_PAGE = 2;

export default function AccountsView() {
  var [query, setQuery] = useState('');
  var [tier, setTier] = useState('all');
  var [view, setView] = useState('all');
  var [page, setPage] = useState(1);

  var rows = useMemo(function () {
    return ACCOUNTS.filter(function (account) {
      var matchesQuery = account.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
      var matchesTier = tier === 'all' || account.tier === tier;
      var matchesView = view === 'all' || (view === 'risk' && account.churnRisk === 'High');
      return matchesQuery && matchesTier && matchesView;
    }).map(function (account) {
      return {
        id: account.id,
        name: account.name,
        owner: account.owner,
        tier: account.tier,
        health: account.health + '%',
        churnRisk: account.churnRisk,
        mrr: '$' + account.mrr.toLocaleString()
      };
    });
  }, [query, tier, view]);

  var pageRows = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="po-page">
      <div className="po-page-header">
        <div>
          <h2 className="po-page-title">Account portfolio</h2>
          <p className="po-subtle">Prioritize renewals and churn interventions across your book of business.</p>
        </div>
      </div>

      <div className="po-filter-row">
        <FwInput
          label="Search accounts"
          placeholder="Northwind, Brightline…"
          value={query}
          onFwInput={function (event) {
            setQuery(event.detail.value);
            setPage(1);
          }}
        />
        <FwSelect
          label="Tier"
          value={tier}
          onFwChange={function (event) {
            setTier(event.detail.value);
            setPage(1);
          }}
        >
          <FwSelectOption value="all">All tiers</FwSelectOption>
          <FwSelectOption value="Enterprise">Enterprise</FwSelectOption>
          <FwSelectOption value="Growth">Growth</FwSelectOption>
          <FwSelectOption value="Scale">Scale</FwSelectOption>
        </FwSelect>
        <FwDatepicker label="Renewal window" placeholder="Select date range" />
        <FwToggleGroup
          value={view}
          onFwChange={function (event) {
            setView(event.detail.value);
            setPage(1);
          }}
        >
          <FwToggleGroupButton value="all">All accounts</FwToggleGroupButton>
          <FwToggleGroupButton value="risk">At risk</FwToggleGroupButton>
        </FwToggleGroup>
      </div>

      <div className="po-tag-row">
        <FwTag text="Renewal Q3" color="blue" />
        <FwTag text="NPS under 20" color="red" />
        <FwPill color="grey">{rows.length} matching accounts</FwPill>
      </div>

      <div className="po-card">
        <div className="po-table-toolbar">
          <span className="po-subtle">Sortable account list with renewal context</span>
          <FwKebabMenu
            options={JSON.stringify([
              { label: 'Export CSV', value: 'export' },
              { label: 'Assign CSM', value: 'assign' }
            ])}
          />
        </div>
        <FwDataTable
          id="pulseops-accounts"
          label="Account portfolio table"
          columns={COLUMNS}
          rows={pageRows}
          isSelectable={true}
        />
        <div className="po-table-footer">
          <FwPagination
            total={rows.length}
            perPage={PER_PAGE}
            currentPage={page}
            onFwChange={function (event) {
              setPage(event.detail.currentPage);
            }}
          />
        </div>
        <div className="po-spotlight-row">
          <FwCustomCellUser name="Sarah Chen" email="sarah@pulseops.test" />
          <FwCustomCellIcon name="warning" color="red" />
          <FwCustomCellParagraph text="Brightline requires executive outreach before renewal." />
          <FwCustomCellAnchor href="#" text="Open account plan" />
        </div>
      </div>
    </div>
  );
}
