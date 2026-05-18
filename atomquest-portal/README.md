# AtomQuest — Goal Setting & Performance Portal

Enterprise OKR/KPI performance management portal built for hackathon demos. Supports employee goal management, manager approvals, admin governance, analytics, audit trails, and quarterly check-ins.

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (Base UI primitives)
- **Recharts** for analytics
- Client-side session storage for demo auth and persistence

## Quick start

```bash
cd atomquest-portal
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to the login page.

## Demo credentials

Use any valid email and a password with **6+ characters**. Select a role on sign-in:

| Role | Landing page | Capabilities |
|------|--------------|--------------|
| **Employee** | `/employee/dashboard` | Create/edit goals, weightage validation, goal locking |
| **Manager** | `/manager/dashboard` | Team overview, approvals, team reviews, analytics |
| **Admin** | `/admin/dashboard` | Org console, users, escalations, audit logs, analytics |

Example: `ruchita.parmar@atomquest.in` / `demo123` → Employee

## Features

### Employee
- Personal goal CRUD with weightage rules (max 8 goals, min 10% each, total ≤ 100%)
- Goal locking after manager approval
- Quarterly check-in tracking (`/checkins`)

### Manager
- Team dashboard with direct-report progress
- Goal approval workflow with inline edit, comments, audit feed
- Team reviews (`/reviews`)
- HR analytics (`/analytics`)

### Admin
- Organization console with cycle status, shared goals, escalations
- User management (`/admin/users`)
- Escalation tracking (`/admin/escalations`)
- Full audit log with search and filters (`/audit`)

### Cross-cutting
- Role-aware sidebar navigation
- Notification center with unread count and mark-as-read
- Profile menu (Profile, Settings, Help, Sign out)
- Organization goals registry (`/goals`)
- Recharts analytics dashboard

## Project structure

```
app/                    # Routes (login, role dashboards, shared pages)
components/
  dashboard/            # AppShell, Sidebar, TopNav, AuthGuard
  employee/goals/       # Employee goal module
  manager/              # Approvals + team overview
  admin/                # Admin console
  analytics/            # Charts and KPI cards
  audit/                # Audit log table
  notifications/        # Notification panel
lib/                    # Auth, navigation, audit, notifications, seed data
```

## Deployment

```bash
npm run build
npm start
```

Deploy to Vercel by connecting the `atomquest-portal` directory as the project root.

## Demo flow (evaluators)

1. Sign in as **Manager** → review team on dashboard → open **Goal Approvals**
2. Sign in as **Employee** → create goals → submit for review
3. Sign in as **Manager** → approve goals (locks employee goals)
4. Open **Analytics** for org-wide charts
5. Sign in as **Admin** → **Audit Logs**, **Escalations**, **User Management**

---

Built for AtomQuest hackathon — enterprise HR performance management.
