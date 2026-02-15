# Insurance & Reinsurance Policy and Claims Management System

## Business Context
Insurance companies underwrite policies and manage claims, while reinsurance companies share risk when exposure exceeds a threshold.  
This project simulates:
- Policy issuance
- Claim lifecycle
- Automatic reinsurance allocation
- Risk exposure tracking

---

## Core Problem Statement
Build a system that manages insurance policies and claims, and automatically transfers part of the risk to reinsurers when exposure crosses predefined limits.

---

## High-Level Architecture
**Frontend:** React 
**Backend:** Node.js API Gateway  

**Services:**
- Policy Service
- Claims Service
- Reinsurance Engine
- User & Auth Service  

**Database:** MongoDB

---
# Project Structure

```
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
│   │   │   │   │   ├── charts
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
│   │   │   │   └── Loader.jsx
│   │   │   ├── assets
│   │   │   ├── App.jsx
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
│   │   │   ├── authController.js
│   │   │   ├── claimController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── policyController.js
│   │   │   ├── reinsurerController.js
│   │   │   ├── riskAllocationController.js
│   │   │   ├── treatyController.js
│   │   │   └── userController.js
│   │   ├── middleware
│   │   │   ├── authMiddleware.js
│   │   │   └── roleGuard.js
│   │   ├── models
│   │   │   ├── AuditLog.js
│   │   │   ├── Claim.js
│   │   │   ├── Policy.js
│   │   │   ├── Reinsurer.js
│   │   │   ├── RiskAllocation.js
│   │   │   ├── Treaty.js
│   │   │   └── User.js
│   │   ├── routes
│   │   │   ├── authRoutes.js
│   │   │   ├── claimRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── policyRoutes.js
│   │   │   ├── reinsurerRoutes.js
│   │   │   ├── riskAllocationRoutes.js
│   │   │   ├── treatyRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── services
│   │   │   ├── helperService.js
│   │   │   └── reinsuranceEngine.js
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
- Underwriter
- Claims Adjuster
- Reinsurance Manager
- Admin

**Features**
- JWT Authentication
- Role-Based Access Control (RBAC)

---

### Policy Management Module
**Policy Attributes**
- Policy Number (Auto-generated)
- Policyholder Details
- Policy Type (Health, Motor, Life, Property)
- Sum Insured
- Premium
- Risk Category
- Policy Status

**Key Logic**
- Exposure Calculation  
- Policy Approval Workflow

---

### Claims Management Module
**Claim Lifecycle**
Submitted → Under Review → Approved → Paid / Rejected

**Features**
- Claim Amount Validation
- Policy Coverage Checks
- Fraud Flagging (Rule-Based)

---

### Reinsurance Allocation Engine
**Business Rule Example**  
If Sum Insured > ₹50,00,000:
- 40% risk → Reinsurer A
- 20% risk → Reinsurer B

**Capabilities**
- Treaty-Based Reinsurance
- Proportional Risk Sharing
- Exposure Aggregation per Reinsurer

---

### Financial & Exposure Dashboard
**Dashboards**
- Total Exposure by Policy Type
- Claims Ratio (Claims / Premium)
- Reinsurer-wise Risk Distribution
- Loss Ratio Trends

---

## MongoDB Data Modelling

**Collections**
- `users`
- `policies`
- `claims`
- `reinsurers`
- `treaties`
- `risk_allocations`
- `audit_logs`

---

## Security & Compliance
- JWT + Refresh Tokens
- Encrypted Sensitive Fields
- Audit Trails
- Soft Deletes

---

## Frontend Architecture (React)

### Top-Level Structure
```bash
src/
 ├── app/
 │   ├── layout/
 │   ├── routes/
 │   ├── features/
 │   ├── shared/
 │   ├── hooks/
 │   └── services/
```

### Key UI Areas
- Layout Components (Sidebar, TopBar, Breadcrumbs)
- Routing & Security Components
- Policy Module
- Claims Module
- Reinsurance Module
- Admin & Configuration
- Shared Components
- Hooks & Services
- Error & Edge Case Handling

---

## Key Features Summary
- Enterprise-Level Role Security
- Policy & Claim Lifecycle Management
- Automated Risk Allocation Engine
- Financial Dashboards
- Modular Frontend Architecture
- Scalable MongoDB Schema

---

## Tech Stack
**Frontend:** React / Angular  
**Backend:** Node.js / Express  
**Database:** MongoDB  
**Authentication:** JWT  
**Architecture Style:** Microservices Inspired

---

## Future Enhancements
- AI-based Fraud Detection
- Advanced Analytics Dashboards
- Third-Party API Integrations
- Cloud Deployment & CI/CD Pipelines


