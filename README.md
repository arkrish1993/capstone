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

## High-Level Architecture

**Frontend:** React (Vite, Context API, Custom Hooks)  
**Backend:** Node.js + Express REST API  
**Database:** MongoDB (Mongoose)

**Core Services / Modules**

- Policy Management
- Claims Management
- Reinsurance Allocation Engine
- Dashboard & Analytics
- User & Authentication Service

**Architecture Style:** Modular Monolith (Service-Oriented Design)

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
│   │   │   │   └── Loader.jsx
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

### User & Role Management

**Roles**

- Admin
- Underwriter
- Claims Adjuster
- Reinsurance Analyst

**Features**

- JWT Authentication
- Role-Based Access Control (RBAC)
- Protected Routes

---

### Policy Management Module

**Key Capabilities**

- Multi-step Policy Wizard
- Auto-generated Policy Numbers
- Exposure Calculation
- Approval Workflow

---

### Claims Management Module

**Lifecycle**
Submitted → Under Review → Approved → Paid / Rejected

**Features**

- Coverage Validation
- Status Timeline UI
- Audit Logging

---

### Reinsurance Allocation Engine

**Capabilities**

- Treaty-Based Allocation
- Proportional Risk Sharing
- Exposure Aggregation per Reinsurer

---

### Dashboard & Analytics

- Exposure by Policy Type
- Claims Ratio
- Reinsurer Risk Distribution
- Trend Visualizations

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
- Audit Trails
- Environment-Based Secrets

---

## Tech Stack

**Frontend:** React, Vite, Context API  
**Backend:** Node.js, Express  
**Database:** MongoDB + Mongoose  
**Authentication:** JWT  
**Architecture:** Modular Monolith

---

## Future Enhancements

- AI-Based Fraud Detection
- Advanced Reporting
- Notifications
- Cloud Deployment & CI/CD
