import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './bootstrap/crayonsInit';
import '../styles/style.css';
import '../styles/themes.css';
import App from './App';
import { ThemeProvider } from '../context/ThemeContext';
import { pulseOpsControllers } from '../utils/crayonsControllers';

function Main() {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(function () {
    var isMounted = true;

    function initClient() {
      if (window.client) {
        return Promise.resolve(window.client);
      }
      return window.app.initialized().then(function (client) {
        window.client = client;
        return client;
      });
    }

    initClient().then(function () {
      pulseOpsControllers();
      if (isMounted) {
        setReady(true);
      }
    }).catch(function () {
      if (isMounted) {
        setFailed(true);
      }
    });

    return function () {
      isMounted = false;
    };
  }, []);

  if (failed) {
    return <div className="po-error">PulseOps could not connect to Freshworks.</div>;
  }

  if (!ready) {
    return <div className="po-loading">Starting PulseOps…</div>;
  }

  return (
    <ThemeProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </ThemeProvider>
  );
}

var container = document.getElementById('root');
var root = createRoot(container);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
