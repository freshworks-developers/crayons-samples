# Crayons v4 Component Catalog

A unified Freshworks Platform 3.0 sample that showcases **Crayons v4** UI components in one ticket-sidebar app. Replaces six near-duplicate per-product clones (v2 + v4 × Freshdesk/Freshservice/Freshsales) with a single catalog **BrightPath Support** developers can browse interactively.

**Platform:** 3.0 · **FDK:** 10.1.2 · **Node:** 24.11.0 · **UI:** Crayons v4

---

## What's included

| Category | Components |
|----------|------------|
| **Forms** | `fw-input`, `fw-textarea`, `fw-select`, `fw-checkbox`, `fw-radio-group`, `fw-toggle`, `fw-datepicker` |
| **Feedback** | `fw-toast`, `fw-spinner`, `fw-skeleton`, `fw-label` |
| **Layout** | `fw-tabs`, `fw-popover`, `fw-tooltip` |
| **Actions** | `fw-button` |

Each section includes a live demo and a short description. Toast is triggered by button; spinner appears during a simulated async load.

---

## Setup

```sh
git clone https://github.com/freshworks-developers/crayons-samples.git
cd crayons-samples
fdk run
```

1. Open a ticket in Freshdesk with `?dev=true`.
2. Click **Crayons Component Catalog** in the ticket sidebar.
3. Switch category tabs (Forms, Feedback, Layout, Actions) and interact with each demo.

```sh
fdk validate
fdk pack
```

---

## Project structure

```
.
├── manifest.json
├── app/
│   ├── views/ticket-sidebar.html
│   ├── scripts/ticket-sidebar.js
│   └── styles/
├── web/                    # Standalone browser demo (legacy, not FDK-bound)
├── README.md
└── USECASE.md
```

---

## Crayons v4 CDN

Components load from the official CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@freshworks/crayons@v4/dist/crayons/crayons.esm.js"></script>
```

No npm install required for the UI layer.

---

## Tech stack

- **Platform:** Freshworks Platform 3.0
- **Runtime:** Node.js 24.11.0 · FDK 10.1.2
- **UI:** Crayons v4

---

## Resources

- [Crayons documentation](https://crayons.freshworks.com/)
- [events-method-samples](../events-method-samples) — unified demo pattern this repo follows
- [USECASE.md](./USECASE.md)
