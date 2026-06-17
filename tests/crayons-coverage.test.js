import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { describe, expect, test } from 'vitest';

var __dirname = path.dirname(fileURLToPath(import.meta.url));
var appRoot = path.join(__dirname, '../app');
var crayonsComponentsPath = path.join(
  __dirname,
  '../node_modules/@freshworks/crayons/react/components.js'
);

function readAppSources() {
  var files = [];
  function walk(dir) {
    fs.readdirSync(dir).forEach(function (name) {
      var full = path.join(dir, name);
      var stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (/\.(jsx|js)$/.test(name)) {
        files.push(fs.readFileSync(full, 'utf8'));
      }
    });
  }
  walk(appRoot);
  return files.join('\n');
}

function readCrayonsComponents() {
  var source = fs.readFileSync(crayonsComponentsPath, 'utf8');
  var match = source.match(/export \{([^}]+)\}/);
  if (!match) {
    throw new Error('Could not parse Crayons component exports');
  }
  return match[1].split(',').map(function (item) {
    return item.trim();
  });
}

describe('Crayons coverage', function () {
  var source = readAppSources();
  var components = readCrayonsComponents();

  test('tracks every export from @freshworks/crayons/react', function () {
    expect(components.length).toBeGreaterThan(0);
  });

  components.forEach(function (component) {
    test('uses ' + component, function () {
      expect(source.indexOf(component)).toBeGreaterThan(-1);
    });
  });

  ['ToastController', 'ProgressLoaderController', 'DateFormatController', 'TranslationController', 'registerIconLibrary'].forEach(function (controller) {
    test('uses ' + controller, function () {
      expect(source.indexOf(controller)).toBeGreaterThan(-1);
    });
  });
});

describe('manifest placeholders', function () {
  test('registers all PulseOps surfaces', function () {
    var manifest = JSON.parse(fs.readFileSync(path.join(__dirname, '../manifest.json'), 'utf8'));
    expect(manifest.metaConfig.framework).toBe('react');
    expect(manifest.modules.common.location.full_page_app.url).toBe('index.html');
    expect(manifest.modules.support_ticket.location.ticket_sidebar.url).toBe('ticketSidebar.html');
    expect(manifest.modules.support_contact.location.contact_sidebar.url).toBe('contactSidebar.html');
    expect(manifest.modules.support_company.location.company_background.url).toBe('companySidebar.html');
    expect(manifest.modules.service_ticket.location.ticket_sidebar.url).toBe('ticketSidebarService.html');
  });
});

describe('placeholder html shells', function () {
  var shells = [
    'index.html',
    'ticketSidebar.html',
    'ticketTopNav.html',
    'contactSidebar.html',
    'companySidebar.html',
    'ctiGlobalSidebar.html',
    'ticketSidebarService.html'
  ];

  shells.forEach(function (shell) {
    test('includes ' + shell, function () {
      expect(fs.existsSync(path.join(appRoot, shell))).toBe(true);
    });
  });
});

describe('styling constraints', function () {
  test('does not use tailwind utility classes in app sources', function () {
    var source = readAppSources();
    expect(source).not.toMatch(/\bclassName="[^"]*\b(flex |grid |gap-[0-9]|p-[0-9]|m-[0-9]|text-gray|dark:)/);
  });
});
