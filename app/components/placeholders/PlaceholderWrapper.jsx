import React, { useEffect, useState, createContext, useContext } from 'react';
import { createRoot } from 'react-dom/client';

const AppLifecycleContext = createContext({
  isInitialized: false,
  isActive: false
});

export function useAppLifecycle() {
  return useContext(AppLifecycleContext);
}

function PlaceholderWrapper({ children, placeholderName }) {
  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    var isMounted = true;
    var clientRef = { current: null };

    function onAppActivated() {
      if (!isMounted) {
        return;
      }
      setIsActive(true);
    }

    function onAppDeactivated() {
      if (!isMounted) {
        return;
      }
      setIsActive(false);
    }

    function init() {
      var initClient = function () {
        if (window.client) {
          return Promise.resolve(window.client);
        }
        return window.app.initialized().then(function (client) {
          window.client = client;
          return client;
        });
      };

      initClient().then(function (client) {
        if (!isMounted) {
          return;
        }
        clientRef.current = client;
        setIsReady(true);
        client.events.on('app.activated', onAppActivated);
        client.events.on('app.deactivated', onAppDeactivated);
      }).catch(function (err) {
        if (!isMounted) {
          return;
        }
        setError(err);
      });
    }

    init();

    return function () {
      isMounted = false;
      var client = clientRef.current;
      if (client) {
        try {
          client.events.off('app.activated', onAppActivated);
          client.events.off('app.deactivated', onAppDeactivated);
        } catch (e) {
          /* ignore */
        }
      }
    };
  }, [placeholderName]);

  if (error) {
    return <div className="po-error">Unable to load PulseOps</div>;
  }

  if (!isReady) {
    return <div className="po-loading">Loading PulseOps…</div>;
  }

  return (
    <AppLifecycleContext.Provider value={{ isInitialized: isReady, isActive: isActive }}>
      {children}
    </AppLifecycleContext.Provider>
  );
}

export function renderPlaceholder(Component, placeholderName) {
  var container = document.getElementById('root');
  var root = createRoot(container);
  root.render(
    <React.StrictMode>
      <PlaceholderWrapper placeholderName={placeholderName}>
        <Component />
      </PlaceholderWrapper>
    </React.StrictMode>
  );
}

export default PlaceholderWrapper;
