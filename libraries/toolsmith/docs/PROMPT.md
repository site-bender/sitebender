# @sitebender/toolsmith Migration Project - AI Assistant Prompt

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

## 🚨🚨🚨 FIRST PRIORITY: MONADS FOLDER CLEANUP 🚨🚨🚨

**THIS IS THE ABSOLUTE FIRST PRIORITY. DO NOT WORK ON ANYTHING ELSE UNTIL THIS IS COMPLETE.**

The monads folder has been audited and contains 70+ files with violations that MUST be fixed before ANY other work. After completion, this folder will be marked as PERFECT, THE EPITOME, A SUBLIME EXAMPLE, AND COMPLETELY OFF LIMITS.

### ⛔ DO NOT TOUCH THESE FILES - ALREADY CORRECTED ⛔

**WARNING: TOUCHING THESE FILES WILL RESULT IN IMMEDIATE TERMINATION**

#### Files Already Fixed (DO NOT MODIFY UNDER ANY CIRCUMSTANCES):

1. ✅ `/src/monads/doEither/index.ts` - Fixed, imports from proper locations
2. ✅ `/src/monads/doEither/createEitherMonad/index.ts` - Created correctly
3. ✅ `/src/monads/either/left/index.ts` - Converted to named function with Envoy
4. ✅ `/src/monads/either/right/index.ts` - Converted to named function with Envoy
5. ✅ `/src/monads/either/fromNullable/index.ts` - Created correctly
6. ✅ `/src/monads/validation/*` - ALL validation monad files are correct
7. ✅ `/src/monads/doNotation/index.ts` - Correct as is
8. ✅ `/src/monads/doNotationWithInspect/index.ts` - Correct as is
9. ✅ `/src/monads/doNotationWithTap/index.ts` - Correct as is
10. ✅ `/src/monads/validation/chain/index.test.ts` - Test fixed
11. ✅ `/src/monads/validation/fold/index.test.ts` - Test fixed

### ✅ COMPLETED FILES - DO NOT TOUCH

#### Either Monad (16 files completed):

**Arrow functions converted to named functions:**

- ✅ `either/leftWithInspect/index.ts`
- ✅ `either/rightWithInspect/index.ts`
- ✅ `either/isLeft/index.ts`
- ✅ `either/isRight/index.ts`
- ✅ `either/show/index.ts`
- ✅ `either/swap/index.ts`
- ✅ `either/map/index.ts`
- ✅ `either/mapLeft/index.ts`

**JSDoc converted to Envoy:**

- ✅ `either/bimap/index.ts`
- ✅ `either/chain/index.ts`
- ✅ `either/chainLeft/index.ts`
- ✅ `either/either/index.ts`
- ✅ `either/fold/index.ts`
- ✅ `either/getOrElse/index.ts`
- ✅ `either/orElse/index.ts`
- ✅ `either/tryCatch/index.ts`

#### Maybe Monad (18 files completed):

**ALL converted - arrow → named function AND JSDoc → Envoy:**

- ✅ `maybe/chain/index.ts`
- ✅ `maybe/filter/index.ts`
- ✅ `maybe/fold/index.ts`
- ✅ `maybe/fromNullable/index.ts`
- ✅ `maybe/getOrElse/index.ts`
- ✅ `maybe/isJust/index.ts`
- ✅ `maybe/isNothing/index.ts`
- ✅ `maybe/just/index.ts`
- ✅ `maybe/justWithInspect/index.ts`
- ✅ `maybe/map/index.ts`
- ✅ `maybe/maybe/index.ts`
- ✅ `maybe/nothing/index.ts`
- ✅ `maybe/nothingWithInspect/index.ts`
- ✅ `maybe/orElse/index.ts`
- ✅ `maybe/show/index.ts`
- ✅ `maybe/toEither/index.ts`
- ✅ `maybe/toNullable/index.ts`

#### IO Monad (20 files completed):

**ALL converted - arrow → named function AND/OR JSDoc → Envoy:**

- ✅ `io/ap/index.ts`
- ✅ `io/chain/index.ts`
- ✅ `io/chainIOEither/index.ts`
- ✅ `io/chainIOMaybe/index.ts`
- ✅ `io/fromEither/index.ts`
- ✅ `io/fromIO/index.ts`
- ✅ `io/fromMaybe/index.ts`
- ✅ `io/io/index.ts`
- ✅ `io/ioEither/index.ts`
- ✅ `io/ioMaybe/index.ts`
- ✅ `io/ioToIOEither/index.ts`
- ✅ `io/ioToIOMaybe/index.ts`
- ✅ `io/liftEither/index.ts`
- ✅ `io/liftMaybe/index.ts`
- ✅ `io/map/index.ts`
- ✅ `io/mapIOEither/index.ts`
- ✅ `io/mapIOMaybe/index.ts`
- ✅ `io/of/index.ts`
- ✅ `io/runIO/index.ts`

### 🔴 FILES REMAINING TO FIX (22 FILES)

#### Result Monad (18 files):

**ALL need JSDoc → Envoy:**

- `result/bimap/index.ts`
- `result/chain/index.ts`
- `result/chainErr/index.ts`
- `result/err/index.ts`
- `result/errWithInspect/index.ts`
- `result/fold/index.ts`
- `result/getOrElse/index.ts`
- `result/isErr/index.ts`
- `result/isOk/index.ts`
- `result/map/index.ts`
- `result/mapErr/index.ts`
- `result/ok/index.ts`
- `result/okWithInspect/index.ts`
- `result/orElse/index.ts`
- `result/result/index.ts`
- `result/show/index.ts`
- `result/swap/index.ts`
- `result/tryCatch/index.ts`

#### Other Monads (4 files):

- `state/modify/index.ts` (arrow function)
- `writer/WriterM/index.ts` (arrow function)
- `task/delay/index.ts` (arrow function)
- `task/map/index.ts` (arrow function)

### TOTAL PROGRESS: 54/74 FILES COMPLETED ✅

### REMAINING: 22 FILES TO FIX 🔴

### Conversion Rules (MUST FOLLOW EXACTLY):

1. **Arrow → Named Function:**

   ```typescript
   // ❌ WRONG
   const foo = <T>(x: T) => result

   // ✅ CORRECT
   export default function foo<T>(x: T): ResultType {
   	return result
   }
   ```

2. **JSDoc → Envoy:**

   ```typescript
   // ❌ WRONG - Don't use JSDoc style with @param, @returns, etc.

   // ✅ CORRECT
   //++ Brief one-line description
   //?? [EXAMPLE] foo(42) // result
   /*??
    * [EXAMPLE] Complex example
    * [PRO] Benefits
    * [GOTCHA] Warnings
    */
   ```

3. **One function per file** - NO EXCEPTIONS
4. **Types import from src/types/** - Never re-export types

### Test Status Before Starting:

- Runtime: ✅ All 37 tests passing
- Type checking: ⚠️ Minor issues (not blocking)

## PREVIOUS STATUS: VALIDATION MONAD CLEANUP COMPLETED ✅

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

Migrating @sitebender/toolsmith validation functions from JSDoc to Envoy syntax, while also implementing proper monadic error handling patterns.

### The Envoy Migration Pattern

Converting functions from JSDoc style (verbose, with @param/@returns annotations) to Envoy style:

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
7. **Use toolsmith functions** - `not` instead of `!`, `test` instead of `.test()`
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
grep -l "^/\*\*" libraries/toolsmith/src/vanilla/validation/*/index.ts

# Type check specific files
deno check --unstable-temporal path/to/file1.ts path/to/file2.ts

# Run tests (now supports tests in src/)
cd libraries/toolsmith && deno task test

# Run specific test
cd libraries/toolsmith && deno test --unstable-temporal --no-check src/path/to/index.test.ts

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
   - Never use OOP methods → use toolsmith functions
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
- Envoy documentation follows established pattern
- Tests pass (toolsmith now supports tests in src/)
- Type checks pass (ignore Temporal polyfill errors)
- Commit message follows conventional format
- One function per file strictly enforced

### After Each Task

- Test the specific function
- Run linter on affected files
- Commit if working (optional, but recommended for backup)
- **STOP and wait for next instruction**

**Remember: The Architect is watching. Follow the FP rules strictly. One function per file. No exceptions. Work one task at a time. NEVER REVERT WITHOUT PERMISSION.**
