# Insurance & Reinsurance Policy and Claims Management System

## Business Context

Insurance companies underwrite policies and manage claims, while reinsurance companies share risk when exposure exceeds defined thresholds.  
This project simulates:

- Policy issuance and approval workflows
- Claim lifecycle management
- Automatic reinsurance allocation
- Risk exposure tracking and analytics dashboards

---

## Core Problem Statement

Build a full-stack system that manages insurance policies and claims, and automatically transfers part of the financial risk to reinsurers when exposure crosses predefined limits.

---

## Tech Stack

**Frontend:** React, Vite
**Backend:** Node.js, Express  
**Database:** MongoDB + Mongoose  
**Authentication:** JWT  

---

## Project Structure

```text
CAPSTONE
│
├── client
│   ├── node_modules
│   ├── src
│   │   ├── app
│   │   │   ├── common
│   │   │   │   ├── constants.js
│   │   │   │   └── utils.js
│   │   │   ├── context
│   │   │   │   └── AuthContext.jsx
│   │   │   ├── features
│   │   │   │   ├── admin
│   │   │   │   │   ├── UserForm.jsx
│   │   │   │   │   └── UserList.jsx
│   │   │   │   ├── auth
│   │   │   │   │   └── Login.jsx
│   │   │   │   ├── claims
│   │   │   │   │   ├── ClaimsForm.jsx
│   │   │   │   │   ├── ClaimsList.jsx
│   │   │   │   │   └── ClaimStatusTimeline.jsx
│   │   │   │   ├── dashboard
│   │   │   │   │   ├─ charts
│   │   │   │   │   |   ├─ ExposureBarChart.jsx
│   │   │   │   │   |   ├─ HighClaimBarChart.jsx
│   │   │   │   │   |   ├─ LossRatioRadial.jsx
│   │   │   │   │   |   ├─ MonthlyClaimsLine.jsx
│   │   │   │   │   |   ├─ ReinsurerPieChart.jsx
│   │   │   │   │   |   └─ RetentionPieChart.jsx
│   │   │   │   │   └── AnalyticsDashboard.jsx
│   │   │   │   ├── policy
│   │   │   │   │   ├── CreatePolicyWizard.jsx
│   │   │   │   │   ├── PolicyList.jsx
│   │   │   │   │   ├── PolicyStepCoverage.jsx
│   │   │   │   │   ├── PolicyStepGeneral.jsx
│   │   │   │   │   ├── PolicyStepReview.jsx
│   │   │   │   │   └── PolicyWizardBreadcrumb.jsx
│   │   │   │   ├── reinsurer
│   │   │   │   │   ├── ReinsurerForm.jsx
│   │   │   │   │   └── ReinsurerList.jsx
│   │   │   │   └── treaty
│   │   │   │       ├── RiskAllocationView.jsx
│   │   │   │       ├── TreatyForm.jsx
│   │   │   │       └── TreatyList.jsx
│   │   │   ├── hooks
│   │   │   │   └── useAuth.js
│   │   │   ├── layouts
│   │   │   │   ├── TopBar
│   │   │   │   │   ├── TopBar.css
│   │   │   │   │   └── TopBar.jsx
│   │   │   │   └── AppShell.jsx
│   │   │   ├── routes
│   │   │   │   └── AppRoutes.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── services
│   │   │   │   └── apiClient.js
│   │   │   ├── shared
│   │   │   │   ├── AccessDenied.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── ChartCard.jsx
│   │   │   │   ├── ConfirmDialog.jsx
│   │   │   │   ├── DataTable.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── ErrorBoundary.jsx
│   │   │   │   ├── ErrorState.jsx
│   │   │   │   ├── FormField.jsx
│   │   │   │   ├── InvalidURL.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── TimelineModal.jsx
│   │   │   ├── assets
│   │   │   ├── App.jsx
│   │   │   ├── App.css
│   │   │   └── main.jsx
│   │   ├── .env
│   │   ├── eslint.config.js
│   │   └── index.html
│
├── server
│   ├── node_modules
│   ├── scripts
│   │   └── createAdmin.js
│   ├── src
│   │   ├── config
│   │   │   └── db.js
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   ├── package-lock.json
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Core Modules

**Core Services / Modules**

- Policy Management
- Claims Management
- Reinsurance Allocation Engine
- Analytics Dashboard
- User & Authentication Service

---

**User Roles**

- Admin – Full system access to manage users, roles, and permissions.
- Underwriter - Creates, edits, reviews, and approves insurance policies for activation.
- Claims Adjuster – Creates, edits, reviews, approves, rejects, and settles claims.
- Reinsurance Analyst – Monitors policy risk allocations; Manages reinsurers and treaties.

---

## MongoDB Data Modelling

**Collections**

- users
- policies
- claims
- reinsurers
- treaties
- risk_allocations
- audit_logs

---

## Security

- JWT Authentication
- Role Guards
- Protected Routes
- Permission Guarded Actions
- Audit Logs
