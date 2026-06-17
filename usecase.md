# PulseOps — Use Cases

PulseOps is a B2B SaaS customer success and churn analytics product. This sample shows how Freshworks marketplace apps can embed Crayons v4 components in realistic workflows across multiple product surfaces.

---

## Personas

| Persona | Role | Goal |
|---------|------|------|
| **Jordan Lee** | VP Customer Success | Review portfolio health before renewals slip |
| **Sarah Chen** | CSM | Prioritize at-risk accounts and run save playbooks |
| **Alex Rivera** | Support Agent | Resolve tickets with account context visible |
| **Morgan Patel** | Support Lead | Monitor voice queue load and escalation paths |

---

## Full-page dashboard (`common.full_page_app`)

**Jordan** opens PulseOps from the Freshworks app launcher to prepare for the quarterly business review.

### Overview (`/`)

Jordan scans average health score, at-risk account count, open escalations, and portfolio NPS. A warning banner highlights Brightline Health entering a 45-day renewal window. Jordan clicks **Refresh metrics** to pull the latest cohort data.

### Accounts (`/accounts`)

Jordan filters the account table by tier, renewal window, and risk level. Row actions open account plans; pagination handles large portfolios.

### Health (`/health`)

Jordan segments accounts by risk tier and expands accordion rows to see NPS, renewal dates, and recent health changes. Popovers explain metric definitions for the exec deck.

### Playbooks (`/playbooks`)

Jordan reorders renewal save steps via drag-and-drop and configures automation rules (weekly cadence, auto-escalation) in a modal editor.

### Reports (`/reports`)

Jordan imports usage CSVs and downloads renewal forecast exports for the finance team.

### Settings (`/settings`)

Jordan switches between Light, Dark, and Pulse midnight themes; configures SMS alerts, digest schedule, and regional routing for the CS pod.

---

## Ticket sidebar (`support_ticket.ticket_sidebar`)

**Alex** is resolving a ticket for Brightline Health. The PulseOps sidebar shows:

- Linked account health score and renewal risk pill
- Warning that the account enters a 45-day renewal window
- Accordion with recommended save actions (executive outreach, usage review)

Alex does not leave the ticket to understand account context.

---

## Ticket top navigation (`support_ticket.ticket_top_navigation`)

When Alex opens an at-risk account ticket, a compact banner appears in the ticket header: **At-risk account**, renewal countdown, and a link to the account plan in PulseOps.

---

## Contact sidebar (`support_contact.contact_sidebar`)

**Sarah** logs a touchpoint after a QBR with Alex Rivera (champion at Brightline). The sidebar shows:

- Contact avatar and NPS history
- Textarea for CSM notes
- Kebab menu for quick actions (schedule follow-up, add to playbook)

---

## Company background (`support_company.company_background`)

**Sarah** reviews Summit Finance on the company page:

- Seat count vs plan, MRR formatted with Crayons number formatting
- Success tier radio selection (Standard vs Premium)
- Popover showing usage vs plan limits

---

## CTI global sidebar (`common.cti_global_sidebar`)

**Morgan** monitors voice queue health during peak hours:

- Live toggle for queue updates
- Waiting and active call counts
- Pause routing or escalate to lead actions

---

## Freshservice ticket sidebar (`service_ticket.ticket_sidebar`)

Minimal stub confirming PulseOps installs on Freshservice. Shows an informational message that full CS analytics are available on the Freshdesk full-page dashboard.

---

## Design principles demonstrated

1. **Use-case copy** — Health score, churn risk, renewal window, playbook — never component names in user-facing text.
2. **Crayons-only styling** — Layout utilities and components; no Tailwind or external UI kits.
3. **Multi-entry React Meta** — Each placeholder has its own HTML + JSX entry; router only in full page.
4. **Complete component coverage** — Every `@freshworks/crayons/react` export appears somewhere in the app.
