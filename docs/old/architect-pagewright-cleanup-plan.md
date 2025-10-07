# Architect-Pagewright Component Ownership Cleanup Plan

> **Status**: Action plan to resolve blurred architectural boundaries  
> **Priority**: High - Foundation for all other development  
> **Context**: AIs created overlapping functionality between libraries, violating clean architectural separation

## The Problem

As documented in [`docs/architect-codewright-analysis.md`](docs/architect-codewright-analysis.md:145-197), the current implementation has blurred boundaries:

- **Pagewright** has `transform/` directory with Architect-like reactive components
- **Architect** has `constructors/elements/` with HTML element constructors  
- **Overlapping functionality** creates confusion and maintenance burden

## Strategic Approach

### Phase 1: Assessment & Inventory (1-2 days)

#### 1.1 Component Audit
- [ ] **Catalog Pagewright's `transform/` directory**
  - List all comparators, operators, injectors, logical components
  - Document usage patterns across codebase
  - Identify dependencies and breaking changes

- [ ] **Catalog Architect's `constructors/elements/` directory**  
  - List all HTML element constructors
  - Map to equivalent Pagewright components
  - Identify unique functionality that needs preservation

#### 1.2 Usage Analysis
- [ ] **Search codebase for imports from misplaced components**
- [ ] **Document all current usage patterns**
- [ ] **Estimate breaking change impact**

### Phase 2: Boundary Enforcement (3-5 days)

#### 2.1 Move Reactive Components: Pagewright → Architect

**Target Migrations:**
```
FROM: libraries/pagewright/src/transform/comparators/*
TO:   libraries/architect/src/components/comparators/

FROM: libraries/pagewright/src/transform/operators/*  
TO:   libraries/architect/src/components/operators/

FROM: libraries/pagewright/src/transform/injectors/*
TO:   libraries/architect/src/components/injectors/

FROM: libraries/pagewright/src/transform/logical/*
TO:   libraries/architect/src/components/logical/
```

**Process:**
- [ ] **Move files with git history preservation**
- [ ] **Update internal imports within moved components**
- [ ] **Create temporary re-exports in Pagewright for backward compatibility**
- [ ] **Update Architect's main exports**

#### 2.2 Remove HTML Constructors: Architect → Use Pagewright

**Target Removal:**
```
REMOVE: libraries/architect/src/constructors/elements/*
REPLACE: Import equivalent Pagewright components
```

**Process:**
- [ ] **Map each Architect HTML constructor to Pagewright equivalent**
- [ ] **Update Architect components to import from Pagewright**
- [ ] **Remove redundant HTML constructors**
- [ ] **Update Architect's dependency on Pagewright**

### Phase 3: Integration & Testing (2-3 days)

#### 3.1 Update Import Statements
- [ ] **Update all codebase imports using automated codemod**
- [ ] **Remove temporary re-exports**
- [ ] **Test all affected applications**

#### 3.2 Documentation Alignment
- [ ] **Update library README files**
- [ ] **Revise architectural documentation**
- [ ] **Update examples and tutorials**

#### 3.3 Validation
- [ ] **Run full test suite**
- [ ] **Validate example applications**
- [ ] **Performance regression testing**

## Detailed Component Migration Strategy

### Reactive Components (Pagewright → Architect)

**Comparators:**
- `And`, `Or`, `IsEqualTo`, `Matches`, `IsLessThan`, etc.
- **Rationale**: These are behavioral logic, not semantic HTML

**Operators:**  
- `Add`, `Multiply`, `Divide`, `Average`, mathematical functions
- **Rationale**: Calculations are behaviors that enhance HTML elements

**Injectors:**
- `FromElement`, `FromConstant`, `FromAPI`, `From.Element`
- **Rationale**: Data injection is reactive behavior, not markup

**Logical Components:**
- Boolean logic operators for conditional rendering
- **Rationale**: Display control is behavioral, not structural

### HTML Constructors (Remove from Architect)

**Element Constructors:**
- `Audio`, `Select`, `Meta`, `Dialog`, form elements
- **Replacement Strategy**: Use Pagewright's typed wrappers
- **Rationale**: HTML structure is Pagewright's domain

## Integration Points Design

### Clean Architectural Boundaries

```tsx
// ✅ Correct: Pagewright provides structure, Architect enhances
import { EmailField } from "@sitebender/pagewright"
import { Validation, Matches } from "@sitebender/architect"

<EmailField name="email">
  <Validation>
    <Matches pattern="/.+@.+/" />
  </Validation>
</EmailField>
```

### Component Communication Protocol

1. **Pagewright components accept `children`** for Architect behaviors
2. **Architect behaviors attach via DOM properties** (`__sbValidate`, `__sbCalculate`)
3. **Data flows through standardized interfaces**
4. **No reverse dependencies** (Architect imports Pagewright, never vice versa)

## Risk Mitigation

### Breaking Changes Management
- [ ] **Maintain backward compatibility during migration**
- [ ] **Provide clear migration guide for applications**
- [ ] **Version bump with deprecation warnings**

### Testing Strategy
- [ ] **Automated regression tests**
- [ ] **Integration testing between libraries**
- [ ] **Real application validation**

### Rollback Plan
- [ ] **Git branch strategy for safe rollback**
- [ ] **Component functionality verification**
- [ ] **Performance baseline maintenance**

## Success Criteria

### Architectural Clarity
- [ ] **Clear separation**: Pagewright = structure, Architect = behavior  
- [ ] **No duplicate functionality** between libraries
- [ ] **Single source of truth** for each concern

### Developer Experience
- [ ] **Intuitive import patterns**
- [ ] **Consistent component APIs**
- [ ] **Clear documentation** of library boundaries

### System Benefits
- [ ] **Reduced bundle size** (no duplicated code)
- [ ] **Better maintainability** (single responsibility)
- [ ] **AI-safe development** (clear architectural contracts)

## Timeline Estimate

- **Phase 1 (Assessment)**: 1-2 days
- **Phase 2 (Migration)**: 3-5 days  
- **Phase 3 (Integration)**: 2-3 days
- **Total**: 6-10 days

## Implementation Notes

### Tooling Requirements
- **Git history preservation** for component moves
- **Automated codemod** for import updates
- **Regression testing** framework
- **Bundle size monitoring**

### Communication Plan
- **Development team notification** before starting
- **Progress updates** at each phase completion
- **Migration guide** for application developers
- **Architecture decision documentation**

This cleanup will restore the elegant architectural separation that makes Sitebender's "everything is data" approach truly revolutionary, while eliminating the confusion caused by AI-generated architectural violations.
