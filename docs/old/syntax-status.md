# Sitebender Syntax Status

**Purpose**: Track which JSX/component syntax is finalized versus exploratory AI suggestions.

**Legend**:
- 🟢 **CANONICAL** - Final, production-ready syntax. Won't change without major version bump.
- 🟡 **PROPOSED** - AI-suggested concept, needs review/approval before implementation.
- 🔴 **DEPRECATED** - Old syntax being phased out. Use replacement instead.

---

## Authentication & Authorization

### 🟢 CANONICAL: Lock System

**Status**: Finalized 2025-10-02  
**Documentation**: [libraries/steward/docs/locks.md](../libraries/steward/docs/locks.md)

```tsx
// Lock with single key
<Locked>
  <Key>{KEYS.admin}</Key>
  <Route path="/admin" page={<Admin />} />
</Locked>

// Lock with OR logic
<Locked>
  <Or>
    <Key>{KEYS.admin}</Key>
    <Key>{KEYS.editor}</Key>
  </Or>
  <Route path="/edit" page={<Editor />} />
</Locked>

// Lock with AND logic
<Locked>
  <And>
    <Key>{KEYS.admin}</Key>
    <Key>{KEYS.accounting}</Key>
  </And>
  <Route path="/financials" page={<Financials />} />
</Locked>

// Complex nested logic
<Locked>
  <Or>
    <Key>{KEYS.admin}</Key>
    <And>
      <Key>{KEYS.editor}</Key>
      <Key>{KEYS.verified}</Key>
    </And>
  </Or>
  <Route path="/publish" page={<Publish />} />
</Locked>
```

**Components**:
- `<Locked>` - Wrapper requiring authentication + keys
- `<Key>` - Specifies required role/permission
- `<And>` - Logical AND (all keys required)
- `<Or>` - Logical OR (any key works)
- `<Not>` - Logical NOT (future, if needed)

**Rules**:
- Multiple `<Key>` without wrapper defaults to AND (most restrictive)
- Nested `<Locked>` accumulates requirements (AND behavior)
- `<And>`, `<Or>`, `<Not>` can nest for complex logic

**KEYS Constant Location**: `.sitebender/auth/keys.ts`

---

## Boolean Logic Components

### 🟢 CANONICAL: Artificer Conditionals

**Status**: Finalized (existed before lock system)  
**Documentation**: [libraries/artificer/README.md](../libraries/artificer/README.md)

```tsx
// General-purpose boolean logic (used across validation, locks, conditionals)
<And>
  <Condition1 />
  <Condition2 />
</And>

<Or>
  <Condition1 />
  <Condition2 />
</Or>

<Not>
  <Condition />
</Not>
```

**Context**: These are **general-purpose** components used in:
- Validation rules
- Lock conditions
- Conditional rendering
- Workflow decision nodes

**NOT Lock-Specific**: `<And>`, `<Or>`, `<Not>` are primitives used BY the lock system, not part of it.

---

## Conditional Rendering

### 🟡 PROPOSED: ShowIf/HideIf (Artificer)

**Status**: AI-suggested, not implemented  
**Source**: Artificer README examples  
**Needs Review**: Component naming, API design

```tsx
// PROPOSED - NOT YET CANONICAL
<ShowIf>
  <IsEqualTo>
    <Referent><From.Element selector="#userRole" /></Referent>
    <Comparand><From.Constant>admin</From.Constant></Comparand>
  </IsEqualTo>
  <div>Admin Controls Here</div>
</ShowIf>

<HideIf>
  <Condition />
  <div>Hidden when condition true</div>
</HideIf>
```

**Alternatives to Consider**:
- CSS-based visibility (simpler)
- Server-side conditional rendering
- Different component names

**Decision Needed**: Approve as-is, modify API, or reject approach

---

## Routing

### 🟡 PROPOSED: Route/Routes Components

**Status**: Discussed in lost-prompt.md, needs formal specification  
**Context**: Module-owned routes with nesting

```tsx
// PROPOSED - Syntax discussed but not finalized
<Routes>
  <Route path="/" page={<Index />} />
  <Route path="/:slug" page={<Post />} />
  
  <Locked>
    <Key>{KEYS.user}</Key>
    <Route path="/profile" page={<Profile />} />
  </Locked>
</Routes>
```

**Open Questions**:
- Component names (`<Routes>` vs `<Router>` vs different)
- Path resolution (absolute vs relative)
- Nested route syntax
- Module mounting behavior

**Decision Needed**: Finalize API and mark canonical

---

## State Management

### 🟡 PROPOSED: Custodian State Machines (Visual Workflow)

**Status**: AI-suggested extensions in Custodian README  
**Source**: Visual workflow examples added by AI

```tsx
// PROPOSED - NOT YET CANONICAL
<StateMachineWorkflowCanvas>
  <StateMachineDesigner id="user-onboarding">
    <States>
      <State name="initial" type="start" position={[100, 200]}>
        ...
      </State>
    </States>
  </StateMachineDesigner>
</StateMachineWorkflowCanvas>
```

**Concern**: These are visual/design concepts, may not become actual components.

**Decision Needed**: 
- Are these UI design ideas or actual API?
- Should they be in a separate "Visual Workflow Designer" library?
- Or just documentation of what *could* be built with Custodian?

---

## Forms

### 🟡 PROPOSED: Data-Driven Form Components (Artificer)

**Status**: Philosophy documented, components not implemented  
**Source**: Artificer README

```tsx
// PROPOSED - NOT YET CANONICAL
<Form schema="User">
  <ChooseOneField name="role" type="String" />
  <BooleanField name="active" />
  <MemberField name="country" of="CountryEnum" />
  <StringField name="description" type="Text" />
</Form>
```

**Philosophy**: Forms defined by data types, not widgets.

**Decision Needed**:
- Component API finalization
- Widget selection logic
- Integration with Architect form components

---

## Workflow & Orchestration

### 🟡 PROPOSED: Operator Workflow Components

**Status**: AI-suggested extensions in Operator README  
**Source**: Visual workflow examples

```tsx
// PROPOSED - NOT YET CANONICAL
<WorkflowTriggers>
  <On event="git.push">
    <Filter>
      <Branch matches="main" />
    </Filter>
    <Trigger workflow="ci-pipeline" />
  </On>
</WorkflowTriggers>

<DistributedWorkflow id="code-quality-pipeline">
  <Phases>
    <Phase name="parse" executor="arborist">
      ...
    </Phase>
  </Phases>
</DistributedWorkflow>
```

**Concern**: These feel more like configuration than components.

**Decision Needed**:
- Are these JSX components or YAML/JSON config?
- Should workflow be declarative JSX or imperative code?
- Where does this fit in the architecture?

---

## Visual Components

### 🟡 PROPOSED: Envoy Workflow Dashboards

**Status**: AI-suggested visualization concepts  
**Source**: Envoy README workflow examples

```tsx
// PROPOSED - NOT YET CANONICAL
<EnvoyWorkflowDashboard>
  <WorkflowCanvas>
    <LibraryNode id="warden" type="governance" status="active">
      ...
    </LibraryNode>
  </WorkflowCanvas>
</EnvoyWorkflowDashboard>
```

**Concern**: Visual design concepts, not implemented components.

**Decision Needed**: 
- These are UI mockups, not API specs
- Should be marked as "Vision" or "Future" not "Proposed"

---

## Documentation Markers

### 🟢 CANONICAL: Envoy Comment Syntax

**Status**: Finalized  
**Documentation**: [libraries/envoy/README.md](../libraries/envoy/README.md)

```typescript
//++ Description (what code does)
//-- Tech debt with remediation plan
//?? Help (examples, gotchas, pros/cons)
//!! Critical issues
//>> Links (HATEOAS relationships)
```

**Rules**:
- Use sparingly (let automation handle most documentation)
- `//++` required for all exported functions
- Others optional, only for info machines can't derive

---

## How to Update This Document

When adding new syntax:

1. **Add entry under appropriate category**
2. **Mark status**: 🟢 CANONICAL, 🟡 PROPOSED, or 🔴 DEPRECATED
3. **Include code example** with status comment
4. **Link to documentation** (if canonical)
5. **Note decision needed** (if proposed)
6. **Update library READMEs** to match status

When finalizing proposed syntax:

1. **Change status** from 🟡 PROPOSED to 🟢 CANONICAL
2. **Add finalization date**
3. **Create/update documentation**
4. **Remove "Decision Needed" section**
5. **Update all library READMEs** to remove "PROPOSED" markers

When deprecating syntax:

1. **Change status** to 🔴 DEPRECATED
2. **Add deprecation date**
3. **Document replacement syntax**
4. **Add migration guide**

---

## Review Schedule

This document should be reviewed:
- After each major library API decision
- Before any beta/stable release
- When AIs suggest new syntax in library READMEs

**Last Updated**: 2025-10-02  
**Next Review**: Before beta release
