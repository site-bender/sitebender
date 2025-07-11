# A Storied Life - Development Roadmap & TODO

This file contains the complete development roadmap for taking A Storied Life from current state to production. **This file is loaded with Claude context** to ensure all development priorities are understood.

## 🏗️ DEVELOPMENT PHASES OVERVIEW

**Phase 1**: Database & Authentication Foundation  
**Phase 2**: Type Safety & Code Quality  
**Phase 3**: Feature Implementation  
**Phase 4**: Production Readiness  

---

## � PHASE 1: DATABASE & AUTHENTICATION FOUNDATION

### 1.1 Supabase Integration with Deno Deploy Edge Functions

- [ ] **Set up Deno Deploy edge functions with Supabase SDK**
  - [ ] Install and configure `@supabase/supabase-js` for Deno
  - [ ] Create edge function architecture that communicates with Supabase
  - [ ] Ensure all API keys remain secure on server-side only
  - [ ] Create connection to both databases:
    - `a-storied-life` (production database)
    - `test-a-storied-life` (test database with extensive test data)

- [ ] **Database query infrastructure**
  - [ ] Create database connection utilities for edge functions
  - [ ] Implement query helpers for common operations
  - [ ] Set up connection pooling and error handling
  - [ ] Create separate configs for production vs test databases

- [ ] **Database migrations system**
  - [ ] Set up migration runner that works with both databases
  - [ ] Create migration structure in `database/data/` folder
  - [ ] Ensure migrations can run on both `a-storied-life` and `test-a-storied-life`
  - [ ] Add safeguards to prevent test data in production database

### 1.2 Test Data Infrastructure

- [ ] **Create extensive test data migrations**
  - [ ] Design realistic test data that mimics production data shapes
  - [ ] Create table-by-table migrations in `database/data/`
  - [ ] Ensure test data covers edge cases and various scenarios
  - [ ] **CRITICAL**: Test data migrations only run on `test-a-storied-life`, never production

- [ ] **Test data requirements**:
  - [ ] Users with various roles and states (active, inactive, different permissions)
  - [ ] Content in various stages (draft, published, archived)
  - [ ] Complex relationships between users and content
  - [ ] Edge case data (very long content, special characters, etc.)
  - [ ] Large volume data for performance testing

### 1.3 Authentication & Authorization Implementation

- [ ] **Supabase Magic Links Authentication**
  - [ ] Set up Supabase Auth with magic links
  - [ ] Create sign in/sign up form (single form for both)
  - [ ] Implement backend logic:
    - Check if user exists → magic link for sign in
    - User doesn't exist → add to `registrants` table → confirmation email
  - [ ] Set up email templates and confirmation flow

- [ ] **Single Sign In/Up Form Requirements**:
  - [ ] One email field + "Sign In or Up" button
  - [ ] Backend determines sign in vs registration based on existing email
  - [ ] Clear user feedback about what action was taken
  - [ ] Email confirmation for new registrations
  - [ ] Magic link authentication for existing users

- [ ] **Progressive Enhancement: Biometric Authentication**
  - [ ] Research and implement biometric authentication as enhancement
  - [ ] WebAuthn/FIDO2 implementation
  - [ ] Fallback gracefully to email-only auth when biometrics unavailable

- [ ] **Row Level Security (RLS)**
  - [ ] Implement Supabase RLS policies
  - [ ] Ensure authenticated users can only access authorized data
  - [ ] Test RLS policies thoroughly with various user scenarios

---

## 📋 PHASE 2: TYPE SAFETY & CODE QUALITY

### 2.1 Database-Generated TypeScript Types

- [ ] **Implement `pg-to-ts` for type generation**
  - [ ] Set up `pg-to-ts` to generate types from database schema
  - [ ] Configure automatic type generation on schema changes
  - [ ] Ensure generated types are used throughout the application

- [ ] **Database schema improvements**
  - [ ] Add proper PostgreSQL domains for data validation
  - [ ] Implement database constraints for data integrity
  - [ ] Add check constraints for business rules
  - [ ] Use PostgreSQL enums where appropriate

### 2.2 TypeScript Code Cleanup

- [ ] **Clean up `~types` folder**
  - [ ] Remove all `any` types - replace with proper types
  - [ ] Remove unused type definitions
  - [ ] Convert all interfaces to types (per project standards)
  - [ ] Ensure all types align with database-generated types
  - [ ] Remove redundant type definitions

- [ ] **Type safety improvements**
  - [ ] Ensure strict TypeScript compliance throughout codebase
  - [ ] Add type guards where necessary
  - [ ] Improve function signatures with better types
  - [ ] Remove type assertions unless absolutely necessary

### 2.3 Form Components Accessibility & Consistency

- [ ] **FormattedField Enhancement**
  - [ ] Refactor FormattedField to use LabelWrapper for consistency
  - [ ] Implement dual-input strategy (formatted visible + hidden unformatted)
  - [ ] Add proper inputmode attributes (numeric, text, etc.)
  - [ ] Implement CSS :valid/:invalid styling for visual feedback
  - [ ] Add aria-live regions for formatting feedback
  - [ ] Complete missing formatter implementations (14 remaining formatters)
  - [ ] Add comprehensive country code support for postal codes

- [ ] **Server-Side Form Enhancement** (Future - Deno Deploy Phase)
  - [ ] Pre-generate validation patterns server-side
  - [ ] Implement server-side validation using same formatter functions
  - [ ] Add server-side pattern validation as fallback for JS-disabled users
  - [ ] Create shared validation/pattern system between client and server

- [ ] **Form Field Standardization**
  - [ ] Complete refactoring of remaining simple fields to use LabelWrapper
  - [ ] Review complex fields (PhoneNumberField, etc.) for accessibility improvements
  - [ ] Add select element support to LabelWrapper for ChooseOneField ✅
  - [ ] Ensure all fields follow WCAG 2.2 AAA accessibility standards
  - [ ] Rename FormattedField → FormattedTextField for consistency
  - [ ] Rename AutocompleteField → TypeaheadTextField for consistency

### 2.4 Data-Type-Driven Form Architecture (Future - Advanced Phase)

- [ ] **Automatic Form Generation System**
  - [ ] Database schema introspection for automatic form generation
  - [ ] Constraint mapping: DB constraints → HTML attributes (maxlength, pattern, etc.)
  - [ ] Foreign key relationships → ChooseOneField with populated options
  - [ ] GraphQL integration for relationship data fetching

- [ ] **Complex Data Type Fields**
  - [ ] JSON field handling (text vs. complex tree structure with key-value editing)
  - [ ] Array field handling
  - [ ] Composite type field handling

- [ ] **Advanced Validation & Conditional Logic**
  - [ ] JSON-based validation system with native JS function support
  - [ ] Conditional field display logic
  - [ ] Cross-field validation dependencies
  - [ ] Progressive enhancement for complex validation rules

---

## 📋 PHASE 3: FEATURE IMPLEMENTATION

### 3.1 Core User Features

- [ ] **Contact Form Implementation**
  - [ ] Create contact form with proper validation
  - [ ] Implement backend processing via edge functions
  - [ ] Add email sending capability
  - [ ] Create admin interface for managing contact submissions

- [ ] **User Dashboard & Profile**
  - [ ] Implement user dashboard after authentication
  - [ ] User profile management
  - [ ] Account settings and preferences

### 3.2 Content Management Features

- [ ] **Content Creation & Management**
  - [ ] Story creation and editing interface
  - [ ] Content moderation workflow
  - [ ] Publishing and draft management

### 3.3 Advanced Testing Implementation

- [ ] **Comprehensive Behavioral Tests with Playwright MCP**
  - [ ] User registration and authentication flows
  - [ ] Content creation and management workflows
  - [ ] Complex user interactions with large test datasets
  - [ ] Performance testing with realistic data volumes

---

## 📋 PHASE 4: PRODUCTION READINESS

### 4.1 Critical Blockers (Must Complete Before Launch)

- [ ] **Home Page Replacement** ⚠️ **HIGHEST PRIORITY**
  - [ ] Replace `/src/routes/index.tsx` placeholder with real home page
  - [ ] Update all behavioral tests to start from `/` instead of `/backstage`
  - [ ] Remove or secure `/backstage` access (admin-only)
  - [ ] Verify navigation flows work from real home page

- [ ] **Security & Access Control**
  - [ ] Secure `/backstage` route - admin access only
  - [ ] Implement proper authentication for management features
  - [ ] Configure SSL/HTTPS for production
  - [ ] Review and secure all environment variables

### 4.2 Content & Legal Compliance

- [ ] **Legal Pages Content Review**
  - [ ] Privacy Policy - review and finalize content
  - [ ] Terms of Use - review and finalize content
  - [ ] Cookie Policy - review and finalize content
  - [ ] About page - review and finalize content

### 4.3 Production Testing & Deployment

- [ ] **Comprehensive Testing**
  - [ ] All behavioral tests passing with real home page
  - [ ] Performance testing with realistic data loads
  - [ ] Mobile responsiveness across devices
  - [ ] Accessibility compliance testing
  - [ ] Cross-browser compatibility testing

- [ ] **Production Infrastructure**
  - [ ] Production deployment process tested
  - [ ] Database migrations tested in production-like environment
  - [ ] Backup and disaster recovery procedures
  - [ ] Monitoring, logging, and error tracking
  - [ ] Analytics setup (if desired)

---

## 🎯 CURRENT PRIORITY FOCUS

**NEXT STEPS (Immediate priorities)**:

1. **Supabase Integration** - Set up edge functions with Supabase SDK
2. **Database Connections** - Implement query infrastructure for both databases
3. **Test Data System** - Create migration system for extensive test data
4. **Authentication Foundation** - Implement magic link auth with single form

---

## 📁 KEY FILES & LOCATIONS

**Database & Types**:
- `database/data/` - Test data migrations (to be created)
- `src/types/` - TypeScript types (needs cleanup)

**Authentication**:
- `src/routes/sign-in-or-up/` - Single auth form (to be enhanced)

**Testing**:
- `tests/tasks/` - Behavioral tests (currently use `/backstage` entry point)

**Current Placeholder**:
- `src/routes/index.tsx` - Shows "Nothing to see here" (needs replacement)

---

## 🔍 VERIFICATION COMMANDS

```bash
# Current behavioral test (uses /backstage)
deno run --allow-all tests/tasks/information-access/access-about-information/index.test.ts

# Check placeholder home page
curl http://localhost:5555/ | grep -i "nothing to see"

# Verify backstage functionality
curl http://localhost:5555/backstage | grep -i "shootout"

# Run all tests
deno task test

# Check TypeScript compliance
deno task check
```

---

## 📝 NOTES & CONTEXT

- **Architecture**: Deno Deploy edge functions ↔ Supabase (API keys secure on backend)
- **Testing**: `/backstage` currently used as entry point, will switch to `/` when real home page ready
- **Database Strategy**: Dual database setup for production and testing with extensive test data
- **Authentication Flow**: Single form determines sign in vs sign up, progressive enhancement with biometrics
- **Type Safety**: Database-first approach with generated TypeScript types

---

*Last Updated: June 30, 2025*  
*Status: Phase 1 Ready to Begin - Supabase Integration*  
*Context: Loaded with Claude for complete development awareness*
