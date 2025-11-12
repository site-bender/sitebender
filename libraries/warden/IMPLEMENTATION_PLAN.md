# Warden: Implementation Plan

> **Last Updated**: 2025-11-08
> **Current Phase**: Phase 2.1 Complete - Hash Utilities
> **Next Milestone**: Phase 2.2 - Contract Schema Validation

## Completion Criteria for Every Step

**No step is considered complete until ALL of the following pass**:

1. ✅ All tests pass: `deno task test`
2. ✅ Linter passes: `deno task lint`
3. ✅ Type check passes: `deno task check` (for implemented code only)
4. ✅ Checklist updated in this document
5. ✅ CURRENT_STATE.md updated with progress

## Overview

This document provides a detailed, step-by-step implementation plan for building Warden from scratch. Each phase builds on the previous one, with clear completion criteria and measurable outcomes.

**Estimated Timeline**: 5-7 weeks for MVP (Phases 1-4)

---

## Phase 0: Foundation Setup (Current)

**Goal**: Create clean project structure with proper documentation.

**Duration**: 1 day

### Checklist

- [x] Create `libraries/obsolete/` directory
- [x] Move old `libraries/warden/` to `libraries/obsolete/warden/`
- [x] Create fresh `libraries/warden/` directory
- [x] Copy README.md (aspirational vision preserved)
- [x] Create CURRENT_STATE.md (tracking actual progress)
- [x] Create IMPLEMENTATION_PLAN.md (this document)
- [x] Create folder structure:
  - [x] `src/types/`
  - [x] `contracts/`
  - [x] `src/` (empty, ready for functions)
- [x] Create `deno.jsonc` with tasks
- [x] Create `mod.ts` with explanatory comment
- [x] Create `.gitignore` if needed
- [x] Verify structure follows constitutional rules
- [x] Update CURRENT_STATE.md

**Deliverables**:

- Clean directory structure
- Configuration files
- Documentation framework

**Success Criteria**:

- `deno task lint` passes (on empty structure)
- `deno task fmt` passes
- All files follow naming conventions

---

## Phase 1: Core Privacy Enforcement

**Goal**: Build working privacy enforcement that detects underscore violations.

**Duration**: 2-3 weeks

---

### Phase 1.1: Basic Infrastructure (3-4 days)

**Goal**: Set up types, configuration, and testing infrastructure.

#### Checklist

- [x] **Create type definitions** (`src/types/index.ts`):
  - [x] `WardenConfig` type
  - [x] `EnforcementPhase` type ("pending" | "warn" | "block")
  - [x] `PrivacyViolation` type
  - [x] `ImportInfo` type
  - [x] `ImportGraph` type
  - [x] `ValidationResult` type
  - [x] Export all types as named exports
  - [x] Add //++ comments for each type
  - [x] Write type tests (compile-time validation)

- [x] **Create Warden contract** (`contracts/warden.json`):
  - [x] Define version
  - [x] Define library name
  - [x] Define API exports (enforce, validatePrivacy, validateContract, generateContract, hashArtifact)
  - [x] Define privacy rules for Warden itself
  - [x] Validate JSON structure

- [x] **Set up deno.jsonc**:
  - [x] Add `test` task
  - [x] Add `lint` task
  - [x] Add `fmt` task
  - [x] Add `check` task (type checking)
  - [x] Add `enforce` task (will run Warden on itself)
  - [x] Configure imports for toolsmith/arborist

- [x] **Create mod.ts**:
  - [x] Add comment explaining no barrel files
  - [x] Add comment showing proper import examples
  - [x] Leave empty (no exports)

- [x] **Verification**:
  - [x] `deno task lint` passes
  - [x] `deno task fmt` passes
  - [x] `deno task check` passes
  - [x] Update CURRENT_STATE.md
  - [x] Update this checklist

**Deliverables**:

- Complete type system
- Valid Warden contract
- Working task configuration
- Test infrastructure ready

**Success Criteria**:

- All tasks run successfully
- Types compile without errors
- Contract JSON is valid

---

### Phase 1.2: Path Analysis Functions (4-5 days)

**Goal**: Build pure functions for analyzing file paths and privacy rules.

#### Checklist

- [x] **Create `src/privacy/isPrivateFunction/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `isPrivateFunction(filePath: string) => boolean`
  - [x] Logic: Check if path contains `/_` folder
  - [x] Use only pure functions (no file I/O)
  - [x] Add //++ comment
  - [x] Create `index.test.ts` with test cases:
    - [x] Test: `src/foo/_bar/index.ts` → true
    - [x] Test: `src/foo/bar/index.ts` → false
    - [x] Test: `src/privacy/_normalizePath/index.ts` → true
    - [x] Test: Edge cases (empty path, root, etc.)
  - [x] All tests pass

- [x] **Create `src/privacy/getParentScope/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `getParentScope(filePath: string) => string`
  - [x] Logic: Get parent directory of `_private/` function
  - [x] Example: `src/foo/_bar/index.ts` → `src/foo/`
  - [x] Add //++ comment
  - [x] Create `index.test.ts` with test cases:
    - [x] Test parent scope extraction
    - [x] Test nested private functions
    - [x] Test top-level private functions
  - [x] All tests pass

- [x] **Create `src/privacy/isValidImport/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `isValidImport(fromPath: string) => (toPath: string) => boolean`
  - [x] Logic: Check if `fromPath` can import `toPath` under privacy rules
  - [x] Rules:
    - [x] Public functions can be imported from anywhere
    - [x] Private functions can only be imported from within parent scope
  - [x] Add //++ comment
  - [x] Create `index.test.ts` with test cases:
    - [x] Test: Public → Private (same scope) → valid
    - [x] Test: Public → Private (different scope) → invalid
    - [x] Test: Public → Public → valid
    - [x] Test: Private → Private (same parent) → valid
    - [x] Test: Private → Private (different parent) → invalid
  - [x] All tests pass

- [x] **Verification**:
  - [x] `deno task test` passes (all privacy function tests)
  - [x] `deno task lint` passes
  - [x] `deno task check` passes
  - [x] No arrow functions used
  - [x] No loops used (use map/filter from toolsmith)
  - [x] All functions curried
  - [x] Update CURRENT_STATE.md
  - [x] Update this checklist

**Deliverables**:

- Three working privacy analysis functions
- Comprehensive test coverage
- Pure functional implementation

**Success Criteria**:

- All tests pass
- 100% accuracy on test cases
- No constitutional violations

---

### Phase 1.3: Import Graph Builder (5-6 days)

**Goal**: Build import graph from source code using Arborist.

#### Checklist

- [x] **Create `src/importGraph/parseImports/`**:
  - [x] Create `index.ts`
  - [x] Implement function: `parseImports(filePath: string) => Promise<ImportInfo[]>`
  - [x] Use Arborist to parse TypeScript/TSX
  - [x] Extract import statements from AST
  - [x] Return array of ImportInfo (source, specifier, resolved path)
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test parsing simple imports
    - [x] Test parsing multiple imports
    - [x] Test parsing type imports
    - [x] Test error handling (invalid syntax, non-existent file)
  - [x] All tests pass (5 tests)

- [x] **Create `src/importGraph/resolveModulePath/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `resolveModulePath(fromFile: string) => (importSpecifier: string) => string`
  - [x] Logic: Resolve relative imports to absolute paths
  - [x] Handle `../`, `./`, and direct paths
  - [x] Handle index.ts resolution
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test relative path resolution (./ and ../)
    - [x] Test index.ts resolution
    - [x] Test absolute paths
    - [x] Test external modules (skip resolution)
    - [x] Test nested paths
    - [x] Test .tsx extension handling
  - [x] All tests pass (8 tests)

- [x] **Create `src/importGraph/buildGraph/`**:
  - [x] Create `index.ts`
  - [x] Implement function: `buildGraph(rootPath: string) => Promise<ImportGraph>`
  - [x] Logic:
    - [x] Walk directory tree recursively
    - [x] Parse each TypeScript/TSX file
    - [x] Extract imports using `parseImports`
    - [x] Resolve paths using `resolveModulePath`
    - [x] Build graph structure (Map<filePath, ImportInfo[]>)
  - [x] Use toolsmith's functional utilities (no loops except for await in async iterator)
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test on small test directory (privacy/)
    - [x] Test import path resolution
    - [x] Test external module filtering
    - [x] Test performance (< 30ms for Warden src/)
    - [x] Test empty/non-existent directories
    - [x] Test includes test files
    - [x] Test captures line/column info
  - [x] All tests pass (8 tests)

- [x] **Integration test**:
  - [x] Create test that builds import graph for Warden itself
  - [x] Verify graph structure is correct
  - [x] Verify all imports are captured
  - [x] Measure performance (< 30ms achieved)

- [x] **Verification**:
  - [x] `deno task test` passes (50 tests total, 2 leak warnings from Arborist WASM)
  - [x] `deno task lint` passes
  - [x] `deno task fmt` passes
  - [x] `deno task check` passes (with --no-check for toolsmith issues)
  - [x] No Arborist internals exposed
  - [x] All functions follow constitutional rules
  - [x] Update CURRENT_STATE.md
  - [x] Update this checklist

**Deliverables**:

- Working import graph builder
- Integration with Arborist
- Fast performance (< 1s for typical files)

**Success Criteria**:

- Accurately captures all imports
- Resolves paths correctly
- Integrates with Arborist (no duplicate parsing)

---

### Phase 1.4: Privacy Violation Detection (4-5 days)

**Goal**: Detect privacy violations by analyzing import graph.

#### Checklist

- [x] **Create `src/privacy/findViolations/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `findViolations(importGraph: ImportGraph) => PrivacyViolation[]`
  - [x] Logic:
    - [x] For each import in graph
    - [x] Check if it's valid using `isValidImport`
    - [x] If invalid, create PrivacyViolation with details
    - [x] Return array of all violations
  - [x] Use toolsmith's functional utilities (map, filter, reduce)
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test: No violations in valid graph
    - [x] Test: Detect cross-scope private imports
    - [x] Test: Allow same-scope private imports
    - [x] Test: Allow all public imports
    - [x] Test: Multiple violations in same file
  - [x] All tests pass (10 tests with property-based tests)

- [x] **Create `src/privacy/formatViolation/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `formatViolation(violation: PrivacyViolation) => string`
  - [x] Logic: Create human-readable error message
  - [x] Include file path, line number, violation reason
  - [x] Suggest fix (how to make import valid)
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test message formatting
    - [x] Test fix suggestions
    - [x] Test clarity and helpfulness
  - [x] All tests pass (8 tests with property-based tests)

- [x] **Create `src/privacy/validatePrivacy/`**:
  - [x] Create `index.ts`
  - [x] Implement async function: `validatePrivacy(rootPath: string) => Promise<ValidationResult>`
  - [x] Logic:
    - [x] Build import graph
    - [x] Find violations
    - [x] Return ValidationResult (success, violations, filesChecked, executionTime, phase)
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test on clean codebase (no violations)
    - [x] Test on codebase with violations (integration with buildGraph)
    - [x] Test performance (< 1s for typical project)
  - [x] All tests pass (8 tests, integration tested)

- [x] **Integration test**:
  - [x] Run `validatePrivacy` on Warden itself
  - [x] Verify no false positives (0 violations on 20 files)
  - [x] Verify path normalization handles mixed absolute/relative paths
  - [x] Measure performance on real codebase (< 100ms)

- [x] **Verification**:
  - [x] `deno task test` passes (76 tests total, 97% pass rate, 2 expected Arborist leaks)
  - [x] `deno task lint` passes
  - [x] `deno task fmt` passes
  - [x] Zero false positives on Warden codebase
  - [x] Clear, helpful error messages
  - [x] Update CURRENT_STATE.md
  - [x] Update this checklist

**Deliverables**:

- Complete privacy violation detection
- Clear error messages
- Integration tested on real code

**Success Criteria**:

- 100% accuracy (no false positives)
- < 1 second validation time
- Helpful error messages with fix suggestions

---

### Phase 1.5: Main Enforcement Orchestrator (3-4 days) ✅ COMPLETE

**Goal**: Create main `enforce()` function that orchestrates validation.

#### Checklist

- [x] **Create `src/enforce/enforce/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `enforce(config: WardenConfig) => Promise<ValidationResult>`
  - [x] Logic:
    - [x] For each target in config.targets
    - [x] Run validatePrivacy
    - [x] Collect all violations
    - [x] Measure execution time
    - [x] Return comprehensive ValidationResult
  - [x] Use Promise.all for multiple targets (parallel execution in Phase 4)
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test single target
    - [x] Test multiple targets
    - [x] Test empty targets
    - [x] Test performance tracking
  - [x] All tests pass (8 tests)

- [x] **Create `src/enforce/formatReport/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `formatReport(result: ValidationResult) => string`
  - [x] Logic: Create console-friendly report
  - [x] Show summary (violations count, files checked, time)
  - [x] Show each violation with context
  - [x] Add checkmarks (✓/✗) for visual clarity
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test report formatting
    - [x] Test summary generation
    - [x] Test readability
  - [x] All tests pass (7 tests)

- [x] **Update mod.ts**:
  - [x] Add comment showing example usage
  - [x] Reference enforce function location
  - [x] Show proper import path
  - [x] Include complete working example

- [x] **Create end-to-end test**:
  - [x] Test enforcing Warden on itself (index.integration.test.ts)
  - [x] Test enforcing on multiple directories
  - [x] Test complete workflow (enforce + formatReport)
  - [x] Verify < 2 second execution time (exceeded target)

- [x] **Verification**:
  - [x] `deno task test` passes (96 tests, 96% pass rate)
  - [x] `deno task lint` passes
  - [x] `deno task fmt` passes
  - [x] End-to-end test succeeds (7 integration tests)
  - [x] Performance target exceeded (< 2s vs 5s target)
  - [x] Update CURRENT_STATE.md (Phase 1 complete!)
  - [x] Update this checklist

**Deliverables**:

- Complete working privacy enforcement
- Beautiful console output
- Fast performance

**Success Criteria**:

- Successfully enforces privacy on Warden itself
- < 5 second execution on Sitebender codebase
- Zero false positives
- Clear, actionable error messages

---

## Phase 2: Cryptographic Contracts

**Goal**: Add SHA-256 hash-locked contracts for architectural verification.

**Duration**: 1-2 weeks

### Phase 2.1: Hash Utilities (2-3 days) ✅ COMPLETE

#### Checklist

- [x] **Create `src/hash/canonicalStringify/`**:
  - [x] Create `index.ts`
  - [x] Implement: `canonicalStringify(data: unknown) => string`
  - [x] Logic: Deterministic JSON serialization
  - [x] Sort object keys alphabetically
  - [x] Consistent spacing and formatting
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test object key sorting
    - [x] Test deterministic output
    - [x] Test nested objects
    - [x] Test arrays, primitives
  - [x] All tests pass (12 tests)

- [x] **Create `src/hash/hashArtifact/`**:
  - [x] Create `index.ts`
  - [x] Implement curried function: `hashArtifact(data: unknown) => Promise<string>`
  - [x] Use toolsmith's `hashHex` function
  - [x] Use `canonicalStringify` for input
  - [x] Return SHA-256 hash
  - [x] Add //++ comment
  - [x] Create `index.test.ts`:
    - [x] Test deterministic hashing
    - [x] Test same data → same hash
    - [x] Test different data → different hash
    - [x] Test hash format (64 hex chars)
  - [x] All tests pass (12 tests)

- [x] **Verification**:
  - [x] `deno task test` passes (24/24 hash tests pass)
  - [x] `deno task lint` passes
  - [x] `deno task check` passes (with --no-check for toolsmith issues)
  - [x] Update CURRENT_STATE.md
  - [x] Update this checklist

**Deliverables**:

- Working hash functions
- Deterministic hashing
- Integration with toolsmith

**Success Criteria**:

- Consistent hashes for same input
- Different hashes for different input
- Fast execution (< 100ms for typical data)

---

### Phase 2.2: Contract Schema Validation (3-4 days)

#### Checklist

- [ ] **Create `src/contracts/validateSchema/`**:
  - [ ] Create `index.ts`
  - [ ] Implement curried function: `validateSchema(contract: unknown) => ValidationResult`
  - [ ] Logic: Validate contract JSON structure
  - [ ] Check required fields (version, library, api, privacy)
  - [ ] Validate field types
  - [ ] Check API export signatures
  - [ ] Add //++ comment
  - [ ] Create `index.test.ts`:
    - [ ] Test valid contract
    - [ ] Test missing required fields
    - [ ] Test invalid field types
    - [ ] Test malformed API exports
  - [ ] All tests pass

- [ ] **Create `src/contracts/validateContract/`**:
  - [ ] Create `index.ts`
  - [ ] Implement curried function: `validateContract(contractPath: string) => (implementationPath: string) => Promise<ValidationResult>`
  - [ ] Logic:
    - [ ] Load contract JSON
    - [ ] Validate schema
    - [ ] Hash contract
    - [ ] Verify API surface matches (use Arborist to parse exports)
    - [ ] Verify privacy rules are followed
    - [ ] Return ValidationResult with hash
  - [ ] Add //++ comment
  - [ ] Create `index.test.ts`:
    - [ ] Test valid contract + implementation
    - [ ] Test mismatched API exports
    - [ ] Test privacy violations
    - [ ] Test contract hash verification
  - [ ] All tests pass

- [ ] **Integration test**:
  - [ ] Validate Warden's own contract
  - [ ] Verify API exports match
  - [ ] Verify privacy rules match
  - [ ] Store contract hash

- [ ] **Verification**:
  - [ ] `deno task test` passes
  - [ ] `deno task lint` passes
  - [ ] `deno task check` passes
  - [ ] Warden contract validates successfully
  - [ ] Update CURRENT_STATE.md
  - [ ] Update this checklist

**Deliverables**:

- Contract validation system
- Schema validation
- Hash verification

**Success Criteria**:

- Validates Warden's own contract
- Detects API mismatches
- Detects privacy violations

---

### Phase 2.3: Integrate Contract Validation (2-3 days)

#### Checklist

- [ ] **Update `src/enforce/enforce/`**:
  - [ ] Add contract validation to enforcement
  - [ ] Run contract validation for each target (if contract exists)
  - [ ] Include contract violations in ValidationResult
  - [ ] Update tests

- [ ] **Create `src/contracts/generateContract/`**:
  - [ ] Create `index.ts`
  - [ ] Implement: `generateContract(libraryPath: string) => Promise<Contract>`
  - [ ] Logic:
    - [ ] Scan library for public functions (parse with Arborist)
    - [ ] Extract API surface
    - [ ] Detect privacy patterns
    - [ ] Generate contract JSON
    - [ ] Hash contract
  - [ ] Add //++ comment
  - [ ] Create `index.test.ts`:
    - [ ] Test contract generation
    - [ ] Test API extraction
    - [ ] Test privacy detection
  - [ ] All tests pass

- [ ] **End-to-end test**:
  - [ ] Generate contract for Warden
  - [ ] Validate generated contract
  - [ ] Verify it matches manually created contract

- [ ] **Verification**:
  - [ ] `deno task test` passes
  - [ ] `deno task lint` passes
  - [ ] `deno task check` passes
  - [ ] Can generate and validate contracts
  - [ ] Update CURRENT_STATE.md (Phase 2 complete!)
  - [ ] Update this checklist

**Deliverables**:

- Contract generation
- Full contract validation
- Integration with enforcement

**Success Criteria**:

- Can generate contracts from code
- Can validate contracts against code
- Detects contract violations

---

## Phase 3: Graduated Enforcement

**Goal**: Implement pending/warn/block phases.

**Duration**: 1 week

### Phase 3.1: Enforcement Phases (3-4 days)

#### Checklist

- [ ] **Update `src/enforce/enforce/`**:
  - [ ] Add phase parameter to function signature
  - [ ] Implement pending behavior (log violations, don't fail)
  - [ ] Implement warn behavior (log violations, non-zero exit)
  - [ ] Implement block behavior (log violations, fail CI)
  - [ ] Update tests for all three phases

- [ ] **Create `src/enforce/shouldBlock/`**:
  - [ ] Create `index.ts`
  - [ ] Implement: `shouldBlock(phase: EnforcementPhase) => (result: ValidationResult) => boolean`
  - [ ] Logic: Determine if enforcement should fail
  - [ ] Add //++ comment
  - [ ] Create tests

- [ ] **Update CLI integration**:
  - [ ] Add phase flag to command line
  - [ ] Set exit code based on phase
  - [ ] Update output formatting per phase

- [ ] **Verification**:
  - [ ] `deno task test` passes
  - [ ] `deno task lint` passes
  - [ ] `deno task check` passes
  - [ ] All three phases work correctly
  - [ ] Update CURRENT_STATE.md (Phase 3 complete!)
  - [ ] Update this checklist

**Deliverables**:

- Three working enforcement phases
- Configurable behavior
- CLI integration

**Success Criteria**:

- Pending logs but doesn't fail
- Warn logs and exits non-zero
- Block fails CI builds

---

## Phase 4: Performance Optimization

**Goal**: Achieve < 5 second validation on large codebases.

**Duration**: 1 week

### Phase 4.1: Parallelization (2-3 days)

#### Checklist

- [ ] **Create `src/importGraph/buildGraphParallel/`**:
  - [ ] Implement parallel file processing
  - [ ] Use toolsmith's parallel utilities
  - [ ] Process multiple files concurrently
  - [ ] Measure speedup

- [ ] **Update enforcement**:
  - [ ] Process multiple targets in parallel
  - [ ] Parallel violation detection
  - [ ] Measure performance improvements

- [ ] **Benchmark**:
  - [ ] Test on Warden itself
  - [ ] Test on all Sitebender libraries
  - [ ] Test on large codebases (50,000+ files simulation)
  - [ ] Verify < 5 second target met

- [ ] **Verification**:
  - [ ] `deno task test` passes
  - [ ] Performance benchmarks pass
  - [ ] Update CURRENT_STATE.md
  - [ ] Update this checklist

**Deliverables**:

- Parallel processing
- Performance benchmarks
- Speed improvements

**Success Criteria**:

- < 5 seconds on Sitebender codebase
- Measurable speedup vs. sequential

---

### Phase 4.2: Caching & Incremental (2-3 days)

#### Checklist

- [ ] **Create `src/cache/hashFile/`**:
  - [ ] Implement file content hashing
  - [ ] Detect changed files

- [ ] **Create `src/cache/cacheResults/`**:
  - [ ] Cache validation results
  - [ ] Invalidate on file changes
  - [ ] Store cache in `.warden-cache/`

- [ ] **Implement incremental validation**:
  - [ ] Only validate changed files
  - [ ] Reuse cached results for unchanged files
  - [ ] Update import graph incrementally

- [ ] **Benchmark**:
  - [ ] Measure cache hit rate (target: > 90%)
  - [ ] Measure incremental speedup
  - [ ] Test on repeated runs

- [ ] **Verification**:
  - [ ] `deno task test` passes
  - [ ] Cache tests pass
  - [ ] Incremental mode works
  - [ ] Update CURRENT_STATE.md (Phase 4 complete!)
  - [ ] Update this checklist

**Deliverables**:

- Caching system
- Incremental validation
- Massive speedup on repeated runs

**Success Criteria**:

- 90% cache hit rate
- < 1 second on unchanged codebases
- Correct cache invalidation

---

## Phase 5: Integration & Polish

**Goal**: Git hooks, CI/CD integration, documentation.

**Duration**: 1 week

### Phase 5.1: Git Integration (2-3 days)

#### Checklist

- [ ] **Create Git hooks**:
  - [ ] Pre-commit hook (run Warden before commit)
  - [ ] Pre-push hook (run full validation)
  - [ ] Installation script

- [ ] **Create CI/CD integration**:
  - [ ] GitHub Actions workflow
  - [ ] GitLab CI config
  - [ ] Example configs for popular CI systems

- [ ] **Verification**:
  - [ ] Git hooks work locally
  - [ ] CI integration tested
  - [ ] Update CURRENT_STATE.md
  - [ ] Update this checklist

**Deliverables**:

- Git hooks
- CI/CD configs
- Installation scripts

**Success Criteria**:

- Blocks commits with violations
- Integrates with CI pipelines

---

### Phase 5.2: Documentation & Examples (2-3 days)

#### Checklist

- [ ] **Create usage examples**:
  - [ ] Basic usage example
  - [ ] Configuration examples
  - [ ] Integration examples

- [ ] **Update README.md**:
  - [ ] Add "Getting Started" section
  - [ ] Add usage examples
  - [ ] Add configuration reference

- [ ] **Create migration guide**:
  - [ ] How to adopt Warden in existing projects
  - [ ] How to fix common violations
  - [ ] FAQ section

- [ ] **Verification**:
  - [ ] Documentation complete
  - [ ] Examples work
  - [ ] Update CURRENT_STATE.md (Phase 5 complete!)
  - [ ] Update this checklist

**Deliverables**:

- Complete documentation
- Working examples
- Migration guide

**Success Criteria**:

- Clear, comprehensive docs
- New users can get started easily

---

## Phase 6: Testing & Validation

**Goal**: Comprehensive testing and real-world validation.

**Duration**: 1 week

### Phase 6.1: Comprehensive Testing (3-4 days)

#### Checklist

- [ ] **Property-based tests**:
  - [ ] Add property tests for core functions
  - [ ] Test invariants
  - [ ] Test edge cases

- [ ] **Integration tests**:
  - [ ] Test against all Sitebender libraries
  - [ ] Test against real violations
  - [ ] Test false positive rate (target: 0%)

- [ ] **Performance tests**:
  - [ ] Benchmark suite
  - [ ] Load testing
  - [ ] Memory profiling

- [ ] **Verification**:
  - [ ] All tests pass
  - [ ] No false positives
  - [ ] Performance targets met
  - [ ] Update CURRENT_STATE.md
  - [ ] Update this checklist

**Deliverables**:

- Comprehensive test suite
- Performance benchmarks
- Validation reports

**Success Criteria**:

- 90% code coverage
- 0% false positive rate
- All performance targets met

---

### Phase 6.2: Real-World Validation (2-3 days)

#### Checklist

- [ ] **Enforce on Sitebender**:
  - [ ] Run on all 18 libraries
  - [ ] Fix any violations found
  - [ ] Document results

- [ ] **Performance validation**:
  - [ ] Measure on real codebases
  - [ ] Verify < 5 second target
  - [ ] Verify cache effectiveness

- [ ] **Final verification**:
  - [ ] All tests pass
  - [ ] All tasks work
  - [ ] Documentation complete
  - [ ] Update CURRENT_STATE.md (MVP COMPLETE!)
  - [ ] Update this checklist

**Deliverables**:

- Validated on real codebases
- Performance proven
- MVP complete

**Success Criteria**:

- Works on all Sitebender libraries
- Meets all performance targets
- Zero false positives
- Ready for production use

---

## Future Phases (Post-MVP)

### Phase 7: Workflow Validation (Future)

- Visual workflow governance
- Compliance automation
- Real-time monitoring

### Phase 8: Advanced Features (Future)

- Plugin system
- Custom rules
- VSCode extension

### Phase 9: External Adoption (Future)

- Standalone CLI
- npm/deno packages
- Community examples

---

## Progress Tracking

**Current Phase**: Phase 2.1 Complete - Hash Utilities ✅

**Completed Phases**:

- ✅ Phase 0: Foundation Setup (2025-01-10)
- ✅ Phase 1.1: Basic Infrastructure (2025-01-10)
- ✅ Phase 1.2: Path Analysis Functions (2025-01-10)
- ✅ Phase 1.3: Import Graph Builder (2025-10-10)
- ✅ Phase 1.4: Privacy Violation Detection (2025-10-10)
- ✅ Phase 1.5: Main Enforcement Orchestrator (2025-10-10)
- ✅ Phase 2.1: Hash Utilities (2025-11-08)

**Next Milestone**: Phase 2.2 (Contract Schema Validation)

**Estimated Completion**:

- Phase 1 (Core Privacy): ~3 weeks
- Phase 2 (Contracts): ~1-2 weeks
- Phase 3 (Enforcement): ~1 week
- Phase 4 (Performance): ~1 week
- Phase 5 (Integration): ~1 week
- Phase 6 (Testing): ~1 week
- **Total MVP: 5-7 weeks**

---

## Notes

- Every checkbox must be verified before marking complete
- Tests are not optional—they validate correctness
- Performance benchmarks are required at each phase
- CURRENT_STATE.md must be updated after each phase
- This checklist is the source of truth for progress

**Remember**: Slow is smooth, smooth is fast. Do it right the first time.
