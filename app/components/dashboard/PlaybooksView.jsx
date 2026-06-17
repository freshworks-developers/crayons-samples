import React, { useState } from 'react';
import {
  FwButton,
  FwButtonGroup,
  FwCheckbox,
  FwDragContainer,
  FwDragItem,
  FwForm,
  FwFormControl,
  FwModal,
  FwModalContent,
  FwModalFooter,
  FwModalTitle,
  FwRadio,
  FwRadioGroup,
  FwToggle
} from '@freshworks/crayons/react';
import { PLAYBOOK_STEPS } from '../../data/mockData';

export default function PlaybooksView() {
  var [steps, setSteps] = useState(PLAYBOOK_STEPS);
  var [showModal, setShowModal] = useState(false);
  var [cadence, setCadence] = useState('weekly');
  var [autoEscalate, setAutoEscalate] = useState(true);

  function toggleStep(id) {
    setSteps(function (current) {
      return current.map(function (step) {
        if (step.id === id) {
          return { id: step.id, title: step.title, owner: step.owner, enabled: !step.enabled };
        }
        return step;
      });
    });
  }

  return (
    <div className="po-page">
      <div className="po-page-header">
        <div>
          <h2 className="po-page-title">Renewal playbooks</h2>
          <p className="po-subtle">Standardize save motions before accounts enter the red zone.</p>
        </div>
        <FwButtonGroup>
          <FwButton color="secondary" onClick={function () { setShowModal(true); }}>Edit playbook</FwButton>
          <FwButton color="primary">Publish playbook</FwButton>
        </FwButtonGroup>
      </div>

      <div className="po-card">
        <p className="po-subtle po-section-desc">Drag steps to reorder the renewal workflow for at-risk accounts.</p>
        <FwDragContainer>
          {steps.map(function (step) {
            return (
              <FwDragItem key={step.id}>
                <div className="po-step-card">
                  <div>
                    <strong>{step.title}</strong>
                    <div className="po-subtle">Owner: {step.owner}</div>
                  </div>
                  <FwToggle
                    checked={step.enabled}
                    onFwChange={function () { toggleStep(step.id); }}
                  >
                    {step.enabled ? 'Enabled' : 'Disabled'}
                  </FwToggle>
                </div>
              </FwDragItem>
            );
          })}
        </FwDragContainer>
      </div>

      <FwModal isOpen={showModal} onFwClose={function () { setShowModal(false); }}>
        <FwModalTitle>Configure renewal playbook</FwModalTitle>
        <FwModalContent>
          <FwForm>
            <FwFormControl label="Cadence">
              <FwRadioGroup name="cadence" value={cadence} onFwChange={function (event) { setCadence(event.detail.value); }}>
                <FwRadio value="weekly">Weekly check-in</FwRadio>
                <FwRadio value="biweekly">Bi-weekly review</FwRadio>
              </FwRadioGroup>
            </FwFormControl>
            <FwFormControl label="Automation">
              <FwCheckbox checked={autoEscalate} onFwChange={function (event) { setAutoEscalate(event.detail.checked); }}>
                Escalate to VP CS when health drops below 55
              </FwCheckbox>
            </FwFormControl>
          </FwForm>
        </FwModalContent>
        <FwModalFooter>
          <FwButton color="secondary" onClick={function () { setShowModal(false); }}>Cancel</FwButton>
          <FwButton color="primary" onClick={function () { setShowModal(false); }}>Save playbook</FwButton>
        </FwModalFooter>
      </FwModal>
    </div>
  );
}
