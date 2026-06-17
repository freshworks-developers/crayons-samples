# Use Cases — Crayons Component Catalog

**App:** Crayons v4 Component Catalog  
**Repo:** [freshworks-developers/crayons-samples](https://github.com/freshworks-developers/crayons-samples)

## Company Overview

**BrightPath Support** builds custom Freshdesk sidebar apps for agents. Designers and developers need a single reference app that demonstrates every Crayons control they are allowed to use — without copying snippets from six outdated per-product clones.

## Use Case Scenarios

### 1. Form controls for ticket intake

**Scenario**: Agents create follow-up tickets from the sidebar and need consistent inputs for subject, description, priority, and due date.

**Use Case**: The **Forms** tab demos `fw-input`, `fw-textarea`, `fw-select`, `fw-checkbox`, `fw-radio-group`, `fw-toggle`, and `fw-datepicker` so teams can copy patterns that match Platform 3.0 validation and accessibility defaults.

---

### 2. Feedback during async operations

**Scenario**: Saving sidebar data takes a few seconds; agents need clear loading and success signals.

**Use Case**: The **Feedback** tab shows `fw-spinner` during a simulated load, `fw-toast` on button click, `fw-skeleton` placeholders while content fetches, and `fw-label` badges for ticket states.

---

### 3. Compact layout in a narrow sidebar

**Scenario**: Ticket sidebars have limited width; related settings must stay organized without extra pages.

**Use Case**: The **Layout** tab demonstrates nested `fw-tabs`, contextual `fw-popover` menus, and `fw-tooltip` hints on compact controls.

---

### 4. Action hierarchy

**Scenario**: Destructive and primary actions must be visually distinct to prevent mis-clicks.

**Use Case**: The **Actions** tab showcases `fw-button` color variants (primary, secondary, danger, link, text), sizes, loading, and disabled states.

---

## Surface

| Surface | File |
|---------|------|
| Ticket sidebar (Freshdesk) | `app/views/ticket-sidebar.html` + `app/scripts/ticket-sidebar.js` |

```sh
fdk run
```
