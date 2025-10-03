# Proposed Syntax Requiring Review

**Purpose**: Track AI-suggested JSX in library READMEs that needs review/approval before marking as canonical.

**Status**: Generated 2025-10-02  
**Action Required**: Review each item and decide: approve as canonical, modify, or reject

---

## libraries/architect/README.md

### 🟡 PROPOSED: Conditional Rendering

**Location**: "Display Components" section

```tsx
// ShowIf - conditional rendering
<ShowIf>
  <IsEqualTo>
    <Referent><From.Element selector="#userRole" /></Referent>
    <Comparand><From.Constant>admin</From.Constant></Comparand>
  </IsEqualTo>
  <div>Admin Controls Here</div>
</ShowIf>

// HideIf - inverse conditional  
<HideIf>
  <!-- comparators/injectors as children -->
  <div>Content to hide</div>
</HideIf>

// SwitchDisplay - multi-branch
<SwitchDisplay>
  <!-- nested conditions -->
</SwitchDisplay>
```

**Questions**:
- Component names: `ShowIf`/`HideIf` vs `Visible`/`Hidden` vs CSS approach?
- Should this be client-side only or also SSR?
- How does this interact with locks (similar conditional logic)?

### 🟡 PROPOSED: Data-Driven Forms

**Location**: "Revolutionary: Data-Driven Forms" section

```tsx
<Form schema="User">
  <ChooseOneField name="role" type="String" />
  <BooleanField name="active" />
  <MemberField name="country" of="CountryEnum" />
  <StringField name="description" type="Text" />
</Form>
```

**Questions**:
- Component API finalization needed
- Widget selection logic (radio vs select thresholds)
- Integration with Pagewright form components
- Schema format (JSON Schema? SHACL? Custom?)

### 🟡 PROPOSED: Visual Workflow Components

**Location**: "Conditional Workflow Components" section (large section)

```tsx
<ConditionalWorkflowCanvas>
  <DecisionNode id="deployment-readiness" position={[300, 200]}>
    <VisualProperties>...</VisualProperties>
    <Condition>...</Condition>
  </DecisionNode>
</ConditionalWorkflowCanvas>
```

**Concern**: This entire section feels like UI design concepts, not actual component API.

**Questions**:
- Is this describing what *could* be built or what *will* be built?
- Should this be in a separate "Visual Workflow Designer" library?
- Or is this just documentation of possibilities?

**Recommendation**: Move to "Future Possibilities" or "Vision" section, not presented as current API.

---

## libraries/custodian/README.md

### 🟡 PROPOSED: Visual State Machine Workflow System

**Location**: Large section added by AI

```tsx
<StateMachineWorkflowCanvas>
  <StateMachineDesigner id="user-onboarding">
    <States>
      <State name="initial" type="start" position={[100, 200]}>
        <VisualProperties>
          <Shape type="circle" color="green" />
          <Label>Start</Label>
        </VisualProperties>
      </State>
    </States>
  </StateMachineDesigner>
</StateMachineWorkflowCanvas>
```

**Concern**: Similar to Architect workflow components - this is a visual design concept, not an implemented API.

**Questions**:
- Is Custodian providing UI components for state machine design?
- Or is this describing what a separate visual designer tool would look like?
- Should state machines remain pure data (YAML/JSON) with a separate visual editor?

**Recommendation**: Clarify that these are design concepts for future tooling, not current Custodian API.

---

## libraries/operator/README.md

### 🟡 PROPOSED: Workflow Orchestration Components

**Location**: "Event-Driven Workflow Engine" section

```tsx
<WorkflowTriggers>
  <On event="git.push">
    <Filter>
      <Branch matches="main" />
      <HasFiles pattern="src/**/*.ts" />
    </Filter>
    <Trigger workflow="ci-pipeline" />
  </On>
</WorkflowTriggers>

<DistributedWorkflow id="code-quality-pipeline">
  <Phases>
    <Phase name="parse" executor="arborist">
      <Input type="source-files" />
      <Output type="ast-data" />
    </Phase>
  </Phases>
</DistributedWorkflow>
```

**Questions**:
- Are these JSX components or configuration files (YAML/JSON)?
- Should workflows be declarative JSX or imperative code?
- Where does this fit in the architecture?

**Recommendation**: Decide if Operator provides workflow orchestration or just pub/sub primitives.

---

## libraries/envoy/README.md

### 🟡 PROPOSED: Visual Workflow Dashboard

**Location**: "Visual Workflow Dashboard" section

```tsx
<EnvoyWorkflowDashboard>
  <WorkflowCanvas>
    <LibraryNode id="warden" type="governance" status="active">
      <Inputs>
        <Port name="codebase" type="file[]" />
      </Inputs>
      <Outputs>
        <Port name="violations" type="violation[]" />
      </Outputs>
    </LibraryNode>
  </WorkflowCanvas>
</EnvoyWorkflowDashboard>
```

**Concern**: This is UI mockup/design, not API specification.

**Questions**:
- Is Envoy providing visual dashboard components?
- Or is this describing what a dashboard *could* look like?
- Should this be a separate Workshop library?

**Recommendation**: Mark as "Vision" or move to a design doc, not presented as current API.

---

## How to Handle These

### Option 1: Add PROPOSED Markers to READMEs

Add badges/markers to each code example:

```tsx
// 🟡 PROPOSED - NOT YET IMPLEMENTED

<ShowIf>
  ...
</ShowIf>
```

**Pros**: Clear in-document status  
**Cons**: Lots of editing across multiple files

### Option 2: Move to Separate "Future API" Sections

Reorganize READMEs to have:
- **Current API** (canonical)
- **Planned API** (proposed, under design)
- **Future Possibilities** (exploratory ideas)

**Pros**: Clean separation  
**Cons**: Major reorganization needed

### Option 3: Create "Vision" Documents

Move speculative content to separate files like:
- `libraries/architect/docs/vision.md`
- `libraries/custodian/docs/visual-designer.md`

**Pros**: Keeps READMEs focused on current API  
**Cons**: Content duplication risk

### Recommendation

**Hybrid approach**:

1. **Short-term**: Add `> 🟡 PROPOSED: This API is under design and may change` callouts to speculative sections
2. **Medium-term**: Move large speculative sections (workflow visualizations) to separate `vision.md` files
3. **Long-term**: Finalize APIs and move to canonical status

---

## Pattern: AI-Generated Speculative Features

**Observation**: AIs tend to suggest elaborate visual/workflow features that sound cool but may not align with architecture.

**Solution**: Establish a review process:

1. **AI suggests feature** in README
2. **Mark as PROPOSED** immediately
3. **Discuss with team** - does this fit?
4. **Decision**: Approve (make canonical), Modify (revise API), Reject (remove), or Defer (move to vision doc)

---

## Immediate Actions Needed

### 1. Add Proposed Markers

Files needing `🟡 PROPOSED` callouts:

- `libraries/architect/README.md`
  - ShowIf/HideIf section
  - Data-driven forms section
  - Conditional workflow section (entire)
  
- `libraries/custodian/README.md`
  - Visual State Machine Workflow System section (entire)
  
- `libraries/operator/README.md`
  - Event-Driven Workflow Engine section (entire)
  
- `libraries/envoy/README.md`
  - Visual Workflow Dashboard section (entire)

### 2. Create Vision Documents

Extract speculative content to:

- `libraries/architect/docs/workflow-vision.md` (workflow visualization ideas)
- `libraries/custodian/docs/visual-state-machines.md` (visual designer concepts)
- `libraries/operator/docs/workflow-orchestration.md` (declarative workflows)
- `libraries/envoy/docs/dashboard-vision.md` (visual dashboard UI)

### 3. Update syntax-status.md

Add more entries for proposed syntax found in this review.

---

**Last Updated**: 2025-10-02  
**Next Review**: After each library API decision
