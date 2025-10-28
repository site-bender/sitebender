# Artificer-Architect Component Ownership Cleanup Plan

> **Status**: Action plan to resolve blurred architectural boundaries  
> **Priority**: High - Foundation for all other development  
> **Context**: AIs created overlapping functionality between libraries, violating clean architectural separation

## The Problem

As documented in [`docs/artificer-codewright-analysis.md`](docs/artificer-codewright-analysis.md:145-197), the current implementation has blurred boundaries:

- **Architect** has `transform/` directory with Artificer-like reactive components
- **Artificer** has `constructors/elements/` with HTML element constructors  
- **Overlapping functionality** creates confusion and maintenance burden

## Strategic Approach

### Phase 1: Assessment & Inventory (1-2 days)

#### 1.1 Component Audit
- [ ] **Catalog Architect's `transform/` directory**
  - List all comparators, operators, injectors, logical components
  - Document usage patterns across codebase
  - Identify dependencies and breaking changes

- [ ] **Catalog Artificer's `constructors/elements/` directory**  
  - List all HTML element constructors
  - Map to equivalent Architect components
  - Identify unique functionality that needs preservation

#### 1.2 Usage Analysis
- [ ] **Search codebase for imports from misplaced components**
- [ ] **Document all current usage patterns**
- [ ] **Estimate breaking change impact**

### Phase 2: Boundary Enforcement (3-5 days)

#### 2.1 Move Reactive Components: Architect → Artificer

**Target Migrations:**
```
FROM: libraries/architect/src/transform/comparators/*
TO:   libraries/artificer/src/components/comparators/

FROM: libraries/architect/src/transform/operators/*  
TO:   libraries/artificer/src/components/operators/

FROM: libraries/architect/src/transform/injectors/*
TO:   libraries/artificer/src/components/injectors/

FROM: libraries/architect/src/transform/logical/*
TO:   libraries/artificer/src/components/logical/
```

**Process:**
- [ ] **Move files with git history preservation**
- [ ] **Update internal imports within moved components**
- [ ] **Create temporary re-exports in Architect for backward compatibility**
- [ ] **Update Artificer's main exports**

#### 2.2 Remove HTML Constructors: Artificer → Use Architect

**Target Removal:**
```
REMOVE: libraries/artificer/src/constructors/elements/*
REPLACE: Import equivalent Architect components
```

**Process:**
- [ ] **Map each Artificer HTML constructor to Architect equivalent**
- [ ] **Update Artificer components to import from Architect**
- [ ] **Remove redundant HTML constructors**
- [ ] **Update Artificer's dependency on Architect**

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

### Reactive Components (Architect → Artificer)

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

### HTML Constructors (Remove from Artificer)

**Element Constructors:**
- `Audio`, `Select`, `Meta`, `Dialog`, form elements
- **Replacement Strategy**: Use Architect's typed wrappers
- **Rationale**: HTML structure is Architect's domain

## Integration Points Design

### Clean Architectural Boundaries

```tsx
// ✅ Correct: Architect provides structure, Artificer enhances
import { EmailField } from "@sitebender/architect"
import { Validation, Matches } from "@sitebender/artificer"

<EmailField name="email">
  <Validation>
    <Matches pattern="/.+@.+/" />
  </Validation>
</EmailField>
```

### Component Communication Protocol

1. **Architect components accept `children`** for Artificer behaviors
2. **Artificer behaviors attach via DOM properties** (`__sbValidate`, `__sbCalculate`)
3. **Data flows through standardized interfaces**
4. **No reverse dependencies** (Artificer imports Architect, never vice versa)

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
- [ ] **Clear separation**: Architect = structure, Artificer = behavior  
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
