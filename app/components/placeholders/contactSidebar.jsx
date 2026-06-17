import React, { useEffect, useState } from 'react';
import { FwAvatar, FwFormatDate, FwKebabMenu, FwTextarea } from '@freshworks/crayons/react';
import '../bootstrap/crayonsInit';
import '../../styles/themes.css';
import { renderPlaceholder } from './PlaceholderWrapper';

function ContactSidebar() {
  var [notes, setNotes] = useState('Follow up on adoption workshop outcomes.');

  useEffect(function () {
    try {
      window.client.instance.resize({ height: '360px' });
    } catch (e) {
      /* ignore */
    }
  }, []);

  return (
    <div className="po-placeholder po-placeholder-highlight">
      <div className="po-cta-row">
        <div className="po-topbar-brand">
          <FwAvatar name="Alex Rivera" size="small" />
          <div>
            <strong>Alex Rivera</strong>
            <div className="po-subtle">Champion · Summit Finance</div>
          </div>
        </div>
        <FwKebabMenu options={JSON.stringify([
          { label: 'Log touchpoint', value: 'touch' },
          { label: 'Create success plan', value: 'plan' }
        ])} />
      </div>
      <div className="po-subtle po-settings-block">
        Last NPS response: <FwFormatDate date="2026-05-18T00:00:00Z" />
      </div>
      <FwTextarea
        label="CSM touchpoint notes"
        value={notes}
        rows={4}
        onFwInput={function (event) { setNotes(event.detail.value); }}
      />
    </div>
  );
}

renderPlaceholder(ContactSidebar, 'contact_sidebar');
