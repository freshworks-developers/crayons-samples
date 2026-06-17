import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  setTheme: function () {}
});

const THEMES = ['light', 'dark', 'midnight'];

export function ThemeProvider({ children, initialTheme }) {
  const [theme, setThemeState] = useState(initialTheme || 'light');

  useEffect(function () {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(function () {
    if (!window.client) {
      return;
    }

    window.client.db.get('pulseops_theme').then(function (stored) {
      if (stored && stored.theme && THEMES.indexOf(stored.theme) >= 0) {
        setThemeState(stored.theme);
      }
    }).catch(function () {
      /* ignore */
    });
  }, []);

  const setTheme = function (nextTheme) {
    if (THEMES.indexOf(nextTheme) < 0) {
      return;
    }
    setThemeState(nextTheme);
    if (window.client) {
      window.client.db.set('pulseops_theme', { theme: nextTheme }).catch(function () {
        /* ignore */
      });
    }
  };

  const value = useMemo(function () {
    return { theme: theme, setTheme: setTheme, themes: THEMES };
  }, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
