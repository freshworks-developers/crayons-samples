import React, { useState } from 'react';
import {
  FwButton,
  FwFile2,
  FwFileUploader,
  FwFileUploader2,
  FwFileUploaderFile,
  FwFileUploaderProgress,
  FwInlineMessage,
  FwLabel,
  ToastController
} from '@freshworks/crayons/react';

export default function ReportsView() {
  var [uploading, setUploading] = useState(false);

  function downloadForecast() {
    ToastController.trigger({
      type: 'success',
      content: 'Renewal forecast download started.'
    });
  }

  return (
    <div className="po-page">
      <div className="po-page-header">
        <div>
          <h2 className="po-page-title">Reports and imports</h2>
          <p className="po-subtle">Bring CRM and survey data into PulseOps for a unified renewal forecast.</p>
        </div>
      </div>

      <FwInlineMessage type="info">
        Upload this week&apos;s NPS export to refresh churn risk scoring for enterprise accounts.
      </FwInlineMessage>

      <div className="po-two-col">
        <div className="po-card">
          <FwLabel htmlFor="legacy-uploader">Legacy survey import</FwLabel>
          <FwFileUploader
            id="legacy-uploader"
            name="legacySurvey"
            text="Drop CSV here"
            description="Supports NPS and CSAT exports"
            multiple={false}
          />
        </div>
        <div className="po-card">
          <FwLabel htmlFor="modern-uploader">Account usage import</FwLabel>
          <FwFileUploader2
            id="modern-uploader"
            name="usageImport"
            text="Upload product usage CSV"
            description="Used for health score recalculation"
            onFwChange={function () {
              setUploading(true);
              setTimeout(function () { setUploading(false); }, 1200);
            }}
          />
          {uploading ? (
            <>
              <FwFileUploaderFile name="usage-may.csv" size={204800} />
              <FwFileUploaderProgress progress={72} />
            </>
          ) : null}
        </div>
      </div>

      <div className="po-card">
        <h3 className="po-section-title">Generated exports</h3>
        <ul className="po-file-list">
          <li>
            <FwFile2 name="renewal-forecast-q3.pdf" size={512000} />
          </li>
          <li>
            <FwFile2 name="churn-risk-summary.csv" size={96000} />
          </li>
        </ul>
        <FwButton color="primary" onClick={downloadForecast}>Download latest forecast</FwButton>
      </div>
    </div>
  );
}
