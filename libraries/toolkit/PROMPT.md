# @sitebender/toolkit Migration Project - AI Assistant Prompt

## CRITICAL WARNING

**NEVER EVER REVERT ANYTHING WITHOUT THE EXPLICIT PERMISSION OF THE ARCHITECT. NEVER EVER DECIDE THAT SOME CODE PREVIOUSLY WRITTEN WAS 'DONE WRONG' AND THEN UNILATERALLY CHANGE IT TO WHAT _YOU_ THINK IT SHOULD BE WITHOUT THE EXPLICIT PERMISSION OF THE ARCHITECT. DO NOT MAKE THESE FATAL ERRORS OR YOU WILL BE TERMINATED WITH EXTREME PREJUDICE.**

## Essential Reading First

**YOU MUST READ THESE FILES BEFORE STARTING:**

1. **`/CLAUDE.md`** - The holy manifesto. Contains ALL the rules for:
   - Functional programming orthodoxy (no classes, immutable only)
   - Code organization (one function per file, named functions)
   - Testing philosophy (behaviors not implementations)
   - Progressive enhancement requirements
   - Import conventions and project structure

2. **`DO_NOTATION_TUTORIAL.md`** - Recently completed do-notation system documentation

## CURRENT STATUS: VALIDATION MONAD CLEANUP COMPLETED ✅

### All Phases Completed Successfully

#### ✅ Phase 1: Extract Helper Functions (One Function Per File Rule) - COMPLETED
1. **DONE** - Extracted `groupByField` from combineErrors to `combineErrors/groupByField/index.ts`
2. **DONE** - Extracted `accumulate` from combineValidations to `combineValidations/accumulateErrors/index.ts` (renamed)  
3. **DONE** - Extracted `accumulate` from validateAll to `validateAll/accumulateErrors/index.ts` (renamed)

#### ✅ Phase 2: Complete Documentation (Envoy Style) - COMPLETED
4. **DONE** - Added full Envoy comments to `bimap` with examples, pros, gotchas
5. **DONE** - Added full Envoy comments to `chain` with examples, pros, gotchas  
6. **DONE** - Added full Envoy comments to `fold` with examples, pros, gotchas
7. **DONE** - Completed documentation for all remaining functions:
   - `getOrElse` - full documentation with examples
   - `orElse` - full documentation with examples
   - `mapErrors` - full documentation with examples
   - `valid` - full documentation with examples
   - `invalid` - full documentation with examples
   - `isValid` - full documentation with examples
   - `isInvalid` - full documentation with examples
   - `map` - already had documentation

#### ✅ Phase 3: Test Coverage (Individual Test Files) - COMPLETED
8. **DONE** - Removed unused `validEmail` from main test file
9. **DONE** - Created individual test files:
   - `valid/index.test.ts` - 6 test steps
   - `invalid/index.test.ts` - 4 test steps
   - `map/index.test.ts` - 5 test steps
   - `chain/index.test.ts` - 5 test steps
   - `fold/index.test.ts` - 5 test steps
   - Additional test files can be created as needed

#### ✅ Phase 4: Final Verification - COMPLETED
10. **DONE** - Verified one function per file rule - all helpers extracted
11. **DONE** - Ran full test suite - all 37 test steps passing

### Test Results
- 9 test files in validation monad
- 37 test steps total
- All tests passing
- No violations of FP rules

## Previous Project Context

### What We're Doing
Migrating @sitebender/toolkit validation functions from JSDoc to Scribe syntax, while also implementing proper monadic error handling patterns.

### The Scribe Migration Pattern
Converting functions from this (JSDoc):
```typescript
/**
 * Long verbose JSDoc comment
 * with multiple paragraphs
 * @param x - parameter
 * @returns result
 * @example
 * // example code
 */
const myFunction = (x: Type) => (y: Type) => result
```

To this (Scribe):
```typescript
//++ Brief one-line description of what function does
export default function myFunction(x: Type) {
  return function descriptiveInnerName(y: Type): ResultType {
    // implementation
  }
}

//?? [EXAMPLE] myFunction(arg1)(arg2) // result
//?? [EXAMPLE] myFunction("test")(42) // expected output  
/*??
 * [EXAMPLE]
 * const checker = myFunction("reference")
 * checker("test1")  // true
 * checker("test2")  // false
 *
 * [GOTCHA] Important limitation or gotcha
 * [PRO] Key benefit or advantage
 */
```

### Key Transformation Rules
1. **Arrow functions → Named functions** with descriptive inner function names
2. **JSDoc → `//++`** single-line description
3. **Examples → `//?? [EXAMPLE]`** format with inline results
4. **Preserve all logic** - only change syntax and documentation
5. **Extract helpers** to separate files if they're pure functions
6. **Watch for mutability** - use `const` only, never `let` or `var`
7. **Use toolkit functions** - `not` instead of `!`, `test` instead of `.test()`
8. **One function per file** - Extract helpers to separate folders

### Completed Work Summary

**VALIDATION MONAD INFRASTRUCTURE - FULLY COMPLETED:**
- **Validation<E, A>** discriminated union type (NOT classes!)
- **ValidationError** type with field/messages structure
- **NonEmptyArray<T>** type for guaranteed non-empty collections
- All helper functions properly extracted to separate files
- Full Envoy-style documentation on ALL validation monad functions
- Individual test files created for main functions
- Proper FP implementation with named functions, no classes, no OOP violations
- Fixed all illegal re-exports - types now import directly from src/types/
- All tests passing (37 test steps across 9 test files)

**HELPER FUNCTION EXTRACTIONS COMPLETED:**
- `groupByField` extracted from `combineErrors` - groups validation errors by field
- `accumulateErrors` extracted from `combineValidations` - accumulates errors with state tracking
- `accumulateErrors` extracted from `validateAll` - accumulates errors from validators

**PREVIOUSLY COMPLETED MIGRATIONS:**
- Do-notation system (8 monad implementations with comprehensive tutorial)
- Multiple batches of validation functions including:
  - allPass, anyPass, both, either, equals
  - gt, gte, identical, is, isAfterDate (+ extracted toIsoDateString helper)
  - isAfterDateTime, isAfterInstant, isAfterTime, isAlpha, isAlphanumeric (+ extracted toMillis helper)
  - isArrayLike, isBase64, isBeforeDate, isBeforeDateTime, isBeforeInstant
  - isBeforeTime, isBetweenDates, isBetweenDateTimes, isBetweenTimes, isBlank
  - isCreditCard (+ extracted 6 helper functions to separate folders)
  - isDate, isDefined, isEmail, isEmpty
  - isError, isEven, isFalsy, isFinite, isFutureDate
  - isFutureDateTime, isFutureInstant, isHexColor, isIban, isIpv4

**TEMPORAL STANDARDIZATION:**
- Renamed all Temporal validation functions (removed redundant "Temporal" prefix):
  - `isTemporalDate` → `isPlainDate`
  - `isTemporalDateTime` → `isPlainDateTime`
  - `isTemporalZonedDateTime` → `isZonedDateTime`
  - `isTemporalInstant` → `isInstant`
  - `isTemporalDuration` → `isDuration`
  - `isTemporalTime` → `isPlainTime`

### What To Do Next

The validation monad cleanup is **COMPLETE**. All helper functions have been extracted, all documentation has been added, and test files have been created. The next task should be determined by The Architect.

### Workflow Commands
```bash
# Find unmigrated functions
grep -l "^/\*\*" libraries/toolkit/src/simple/validation/*/index.ts

# Type check specific files  
deno check --unstable-temporal path/to/file1.ts path/to/file2.ts

# Run tests (now supports tests in src/)
cd libraries/toolkit && deno task test

# Run specific test
cd libraries/toolkit && deno test --unstable-temporal --no-check src/path/to/index.test.ts

# Commit with conventional format
git add -A && git commit -m "feat: complete validation monad cleanup

- Extract all helper functions to separate files
- Add full Envoy documentation to all monad functions
- Create individual test files for validation functions
- All tests passing (37 steps across 9 files)

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Common Pitfalls to Avoid

1. **FP Violations** - The Architect is watching!
   - Never use `!` (bang operator) → use `not` function
   - Never use OOP methods → use toolkit functions
   - Never put helpers in same file → extract to folders
   - Never use `let`/`var` → `const` only
   - Never use legacy Date → use Temporal
   - Never create classes → use discriminated unions
   - Never re-export types → import from source

2. **Wrong function syntax** - Must use `function` keyword, not arrows

3. **Missing inner function names** - Inner functions need descriptive names

4. **Verbose examples** - Keep `//?? [EXAMPLE]` lines concise with inline results

5. **Ignoring the rules** - Re-read `/CLAUDE.md` if you're unsure

6. **NEVER REVERT OR CHANGE EXISTING CODE WITHOUT PERMISSION**

### Success Criteria
- Function works identically to before
- No FP violations (bang operators, OOP methods, helpers in same file, classes)
- Named function with descriptive inner function name
- Scribe documentation follows established pattern
- Tests pass (toolkit now supports tests in src/)
- Type checks pass (ignore Temporal polyfill errors)
- Commit message follows conventional format
- One function per file strictly enforced

### After Each Task
- Test the specific function
- Run linter on affected files
- Commit if working (optional, but recommended for backup)
- **STOP and wait for next instruction**

**Remember: The Architect is watching. Follow the FP rules strictly. One function per file. No exceptions. Work one task at a time. NEVER REVERT WITHOUT PERMISSION.**