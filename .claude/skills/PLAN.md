# Error-Handling and Testing Skills Completion Plan

**Status:** In Progress
**Current Phase:** PHASE 0 - Planning
**Last Updated:** 2025-10-29

---

## Overview

Complete the incomplete `error-handling` and `testing` skills with:
- Full documentation following existing skill patterns
- Generator scripts with tests
- Example files using the generator scripts
- CLAUDE.md documentation fixes ✅ COMPLETE

---

## PHASE 0: Planning ✅

- [x] Analyze all existing skills
- [x] Identify incomplete skills (error-handling, testing)
- [x] Fix CLAUDE.md documentation inaccuracies
- [x] Create this PLAN.md file
- [ ] Get approval to proceed with PHASE 1

---

## ERROR-HANDLING SKILL COMPLETION

### PHASE 1: RESEARCH (Strict Implementation Workflow)

#### 1.1 Task Type Detection
- [ ] Confirm task types:
  - Documentation writing
  - Function implementation (generator)
  - Type definition (config types)
  - Testing
  - File organization

#### 1.2 Query MCP Servers

**For function implementation (generator script):**
- [ ] `functional_programming_rules`: "pure functions"
- [ ] `functional_programming_rules`: "no loops map reduce"
- [ ] `functional_programming_rules`: "no mutations"
- [ ] `syntax_rules`: "named functions no arrow"
- [ ] `syntax_rules`: "currying patterns"
- [ ] `syntax_rules`: "naming conventions"
- [ ] `constitutional_rules`: "one function per file"
- [ ] `constitutional_rules`: "no mutations immutable"

**For error handling patterns:**
- [ ] `functional_programming_rules`: "Result monad error handling"
- [ ] `functional_programming_rules`: "Validation monad error accumulation"
- [ ] `functional_programming_rules`: "no exceptions try catch throw"
- [ ] `typescript_rules`: "discriminated unions"
- [ ] `typescript_rules`: "ValidationError structure"

**For type definitions:**
- [ ] `typescript_rules`: "branded types newtypes"
- [ ] `typescript_rules`: "type guards predicates"
- [ ] `syntax_rules`: "type naming PascalCase"

**For file organization:**
- [ ] `constitutional_rules`: "file structure one entity per folder"
- [ ] `constitutional_rules`: "no barrel files imports"

**For operator usage:**
- [ ] `operator_substitutions`: "semantic functions instead of operators"

#### 1.3 Research Codebase with Task/Plan Agent

**Existing generator scripts:**
- [ ] Read: `.claude/skills/function-implementation/generator.ts`
- [ ] Read: `.claude/skills/function-implementation/script.ts`
- [ ] Read: `.claude/skills/function-implementation/types.ts`
- [ ] Read: `.claude/skills/type-definition/generator.ts` (if exists)
- [ ] Read: `.claude/skills/component/generator.ts`
- [ ] Read: `.claude/skills/component/script.ts`
- [ ] Read: `.claude/skills/component/types.ts`

**Result/Validation monad implementations:**
- [ ] Read: `/libraries/toolsmith/src/monads/result/ok/index.ts`
- [ ] Read: `/libraries/toolsmith/src/monads/result/error/index.ts`
- [ ] Read: `/libraries/toolsmith/src/monads/result/isOk/index.ts`
- [ ] Read: `/libraries/toolsmith/src/monads/result/isError/index.ts`
- [ ] Read: `/libraries/toolsmith/src/monads/validation/success/index.ts`
- [ ] Read: `/libraries/toolsmith/src/monads/validation/failure/index.ts`
- [ ] Read: `/libraries/toolsmith/src/types/fp/result/index.ts`
- [ ] Read: `/libraries/toolsmith/src/types/fp/validation/index.ts`

**ValidationError and smart constructors:**
- [ ] Read: `/libraries/toolsmith/src/newtypes/Integer/index.ts`
- [ ] Read: `/libraries/toolsmith/src/newtypes/EmailAddress/index.ts` (if exists)
- [ ] Read: `/libraries/toolsmith/src/newtypes/Uuid/index.ts` (if exists)
- [ ] Search for: `createValidationError` function location

#### 1.4 Present Evidence to User
- [ ] Show all MCP query results
- [ ] Show codebase research findings
- [ ] List key rules retrieved
- [ ] Explain how rules will be applied

#### 1.5 Get Confirmation
- [ ] Wait for user approval before PHASE 2

---

### PHASE 2: PLANNING

#### 2.1 Create TODO List for Implementation
- [ ] Use TodoWrite to create detailed task list

#### 2.2 Present Implementation Plan

**Files to create/modify:**

`.claude/skills/error-handling/skill.md`:
- [ ] Pattern 1: Result<T,E> for Fail-Fast Errors
- [ ] Pattern 2: Validation<T,E> for Error Accumulation
- [ ] Pattern 3: ValidationError Type Structure
- [ ] Pattern 4: Creating ValidationErrors (createValidationError)
- [ ] Pattern 5: Error Composition (chaining, combining)
- [ ] Result vs Validation Decision Matrix
- [ ] Constitutional Rule: No Exceptions (detailed)
- [ ] Common Violations section
- [ ] Examples section (reference to examples folder)
- [ ] Cross-references section

`.claude/skills/error-handling/types.ts`:
- [ ] ErrorVariantConfig type
- [ ] ErrorTypeConfig type
- [ ] Supporting types for generator

`.claude/skills/error-handling/generator.ts`:
- [ ] Main generator function
- [ ] Generate discriminated union variants
- [ ] Generate union type
- [ ] Generate type guards (isVariantName)
- [ ] Generate constructor helpers (variantName)
- [ ] Generate tests for type guards
- [ ] Support both lightweight and ValidationError modes

`.claude/skills/error-handling/script.ts`:
- [ ] CLI script that uses generator.ts
- [ ] Parse command-line arguments
- [ ] Load config file
- [ ] Call generator
- [ ] Handle errors

`.claude/skills/error-handling/generator.test.ts`:
- [ ] Test config parsing
- [ ] Test variant generation
- [ ] Test type guard generation
- [ ] Test constructor generation
- [ ] Test both modes (lightweight/ValidationError)

`.claude/skills/error-handling/examples/validateUser.ts`:
- [ ] Example using Validation for multi-field validation
- [ ] Generated using the generator script

`.claude/skills/error-handling/examples/parseInteger.ts`:
- [ ] Example using Result for single-field validation
- [ ] Generated using the generator script

`.claude/skills/error-handling/examples/createError.ts`:
- [ ] Example using createValidationError
- [ ] Handwritten (not generated)

`.claude/skills/error-handling/examples/ioWrapper.ts`:
- [ ] Example wrapping external library at IO boundary
- [ ] Handwritten (not generated)

`.claude/skills/error-handling/examples/chainResults.ts`:
- [ ] Example of chaining Result operations
- [ ] Handwritten (not generated)

**deno.jsonc updates:**
- [ ] Add task: `new:error` for generator script

#### 2.3 Get Approval Before Implementation
- [ ] Wait for user approval of plan

---

### PHASE 3: IMPLEMENTATION

#### 3.1 Read Reference Implementations
- [ ] Study function-implementation generator in detail
- [ ] Study component generator in detail
- [ ] Note common patterns

#### 3.2 Implement skill.md Documentation
- [ ] Write Pattern 1 section
- [ ] Write Pattern 2 section
- [ ] Write Pattern 3 section
- [ ] Write Pattern 4 section
- [ ] Write Pattern 5 section
- [ ] Write Result vs Validation section
- [ ] Write Constitutional Rule section
- [ ] Write Common Violations section
- [ ] Write Examples section
- [ ] Write Cross-references section
- [ ] Update TODO: Mark section complete

#### 3.3 Implement types.ts
- [ ] Define ErrorVariantConfig
- [ ] Define ErrorTypeConfig
- [ ] Export all types
- [ ] Add Envoy comments
- [ ] Update TODO: Mark section complete

#### 3.4 Implement generator.ts
- [ ] Create main generateErrorType function
- [ ] Implement variant generation
- [ ] Implement union type generation
- [ ] Implement type guard generation
- [ ] Implement constructor generation
- [ ] Implement test generation
- [ ] Add lightweight mode
- [ ] Add ValidationError mode
- [ ] Update TODO: Mark section complete

#### 3.5 Implement script.ts
- [ ] Create CLI entry point
- [ ] Parse arguments
- [ ] Load config file
- [ ] Call generator
- [ ] Handle success/error cases
- [ ] Update TODO: Mark section complete

#### 3.6 Create Example Config Files
- [ ] `.claude/skills/error-handling/examples/ApiError.config.ts`
- [ ] `.claude/skills/error-handling/examples/FormError.config.ts`

#### 3.7 Generate Examples Using Script
- [ ] Run: `deno task new:error examples/ApiError.config.ts`
- [ ] Run: `deno task new:error examples/FormError.config.ts`
- [ ] Verify generated files are correct

#### 3.8 Create Handwritten Examples
- [ ] Write createError.ts
- [ ] Write ioWrapper.ts
- [ ] Write chainResults.ts

#### 3.9 Update TODO List
- [ ] Mark each implementation task as completed
- [ ] Keep only ONE task in_progress at a time

---

### PHASE 4: VERIFICATION

#### 4.1 Run Constitutional Verification
- [ ] Check for classes (none allowed)
- [ ] Check for mutations (none allowed)
- [ ] Check for loops (none allowed)
- [ ] Check for OOP methods (use Toolsmith instead)
- [ ] Check for exceptions (only at IO boundaries)
- [ ] Check for arrow functions (none except type sigs)
- [ ] Check for raw operators (use Toolsmith instead)
- [ ] Check one function per file
- [ ] Check all functions curried (when multi-param)
- [ ] Check correct file naming (all index.*)

#### 4.2 Fix Violations
- [ ] If violations found, fix them
- [ ] Re-run verification
- [ ] Repeat until clean

---

### PHASE 5: TESTING

#### 5.1 Write Tests for Generator
- [ ] Write tests in generator.test.ts
- [ ] Test all generator functions
- [ ] Test both modes

#### 5.2 Run Tests
- [ ] `deno test .claude/skills/error-handling/`
- [ ] Verify all tests pass

#### 5.3 Fix Test Failures
- [ ] If failures, analyze and fix
- [ ] Re-run tests
- [ ] Repeat until all pass

#### 5.4 Run Linting
- [ ] `deno task lint`
- [ ] `deno task fmt`
- [ ] Fix any linting errors

---

### PHASE 6: FINAL PRESENTATION

#### 6.1 Prepare Summary
- [ ] List all files created/modified
- [ ] Show test results
- [ ] Show linting results
- [ ] Demonstrate generator usage

#### 6.2 Present to User
- [ ] Show complete implementation
- [ ] Request review before testing skill

---

## TESTING SKILL COMPLETION

**Status:** Pending review of error-handling skill

This section will be expanded after error-handling skill is complete and reviewed.

### High-Level Plan

1. **PHASE 1: RESEARCH**
   - Query MCP servers for testing patterns
   - Research existing test files in Toolsmith
   - Study property-based testing examples

2. **PHASE 2: PLANNING**
   - Document testing patterns (unary, curried, higher-order, property-based, error paths)
   - Plan generator script for test boilerplate
   - Plan examples

3. **PHASE 3: IMPLEMENTATION**
   - Complete skill.md
   - Create types.ts (TestConfig)
   - Create generator.ts
   - Create script.ts
   - Generate examples
   - Create handwritten examples

4. **PHASE 4-6: VERIFICATION, TESTING, PRESENTATION**
   - Same process as error-handling skill

---

## Files Created/Modified Tracking

### Completed ✅
- [x] `/Users/guy/Workspace/@sitebender/sitebender/CLAUDE.md` - Fixed documentation
- [x] `/Users/guy/Workspace/@sitebender/sitebender/.claude/skills/PLAN.md` - This file

### To Be Created (Error-Handling)
- [ ] `.claude/skills/error-handling/skill.md` (update)
- [ ] `.claude/skills/error-handling/types.ts`
- [ ] `.claude/skills/error-handling/generator.ts`
- [ ] `.claude/skills/error-handling/script.ts`
- [ ] `.claude/skills/error-handling/generator.test.ts`
- [ ] `.claude/skills/error-handling/examples/ApiError.config.ts`
- [ ] `.claude/skills/error-handling/examples/FormError.config.ts`
- [ ] `.claude/skills/error-handling/examples/validateUser.ts` (generated)
- [ ] `.claude/skills/error-handling/examples/parseInteger.ts` (generated)
- [ ] `.claude/skills/error-handling/examples/createError.ts` (handwritten)
- [ ] `.claude/skills/error-handling/examples/ioWrapper.ts` (handwritten)
- [ ] `.claude/skills/error-handling/examples/chainResults.ts` (handwritten)
- [ ] `deno.jsonc` (add new:error task)

### To Be Created (Testing)
- [ ] `.claude/skills/testing/skill.md` (update)
- [ ] `.claude/skills/testing/types.ts`
- [ ] `.claude/skills/testing/generator.ts`
- [ ] `.claude/skills/testing/script.ts`
- [ ] `.claude/skills/testing/generator.test.ts`
- [ ] `.claude/skills/testing/examples/` (various)
- [ ] `deno.jsonc` (add new:test task)

---

## Critical Reminders

### Constitutional Rules to Follow
1. No classes
2. No mutations
3. No loops (use map/filter/reduce)
4. No exceptions (except IO boundaries)
5. No arrow functions (except type signatures)
6. One function per file
7. All functions curried (when multi-param)
8. All files named `index.*`
9. Use Toolsmith functions instead of raw operators
10. No barrel files

### Generator Script Requirements
- Config-based workflow (TypeScript config files)
- Generate comprehensive tests
- Follow existing generator patterns
- Support multiple modes (lightweight + ValidationError)
- Auto-delete config after use (--keep flag to preserve)
- Use Result monad for error handling

### Documentation Requirements
- Follow existing skill patterns
- Include Pattern sections
- Include Common Violations
- Include Examples (with references)
- Include Cross-references
- Use Envoy comments (`//++`)
- Clear, educational tone

### Testing Requirements
- Unit tests for all generator functions
- Property-based tests where applicable
- Integration tests (run generator, verify output)
- Tests must pass before proceeding
- Use Deno test framework

---

## Context Recovery Instructions

If starting a new conversation:

1. **Read this PLAN.md file first**
2. **Check current status** - Find the first unchecked `[ ]` box
3. **Read relevant completed sections** - Understand what's been done
4. **Continue from current phase** - Pick up where left off
5. **Update checklist** - Mark items complete as you go
6. **Update "Last Updated"** - At top of file

---

## Notes and Decisions

### Generator Design Decisions
- Use config files (like function-implementation and component generators)
- Support both lightweight and ValidationError modes
- Generate tests automatically
- Use Result monad throughout
- Follow constitutional rules strictly

### Testing Strategy
- Generator tests: unit + integration
- Example files serve as integration tests
- Property-based tests for invariants
- Use fast-check for property tests

### Documentation Approach
- Reference existing Toolsmith implementations
- Show real-world usage patterns
- Explain "why" not just "what"
- "Help, don't scold" philosophy in examples

---

## End of Plan

This plan will be updated as work progresses. Always check for the latest version.
