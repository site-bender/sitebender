# @sitebender/toolkit Migration Project - AI Assistant Prompt

## Essential Reading First

**YOU MUST READ THESE FILES BEFORE STARTING:**

1. **`/CLAUDE.md`** - The holy manifesto. Contains ALL the rules for:
   - Functional programming orthodoxy (no classes, immutable only)
   - Code organization (one function per file, named functions)
   - Testing philosophy (behaviors not implementations)
   - Progressive enhancement requirements
   - Import conventions and project structure

2. **`DO_NOTATION_TUTORIAL.md`** - Recently completed do-notation system documentation

## Project Status: Validation Module Migration + Monad Implementation

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

### Current Progress

**COMPLETED:**
- Do-notation system (8 monad implementations with comprehensive tutorial)
- **Validation Monad** - NEW! Accumulating error monad with semigroup combining
- Multiple batches of validation functions including:
  - allPass, anyPass, both, either, equals
  - gt, gte, identical, is, isAfterDate (+ extracted toIsoDateString helper)
  - isAfterDateTime, isAfterInstant, isAfterTime, isAlpha, isAlphanumeric (+ extracted toMillis helper)
  - isArrayLike, isBase64, isBeforeDate, isBeforeDateTime, isBeforeInstant
  - isBeforeTime, isBetweenDates, isBetweenDateTimes, isBetweenTimes, isBlank
  - isCreditCard (+ extracted 6 helper functions to separate folders)
  - isDate, isDefined, isEmail, isEmpty (migrated batch)
  - isError, isEven, isFalsy, isFinite, isFutureDate (migrated batch)
  - isFutureDateTime, isFutureInstant, isHexColor, isIban, isIpv4 (migrated batch)

**TEMPORAL STANDARDIZATION:**
- Renamed all Temporal validation functions (removed redundant "Temporal" prefix):
  - `isTemporalDate` → `isPlainDate`
  - `isTemporalDateTime` → `isPlainDateTime`
  - `isTemporalZonedDateTime` → `isZonedDateTime`
  - `isTemporalInstant` → `isInstant`
  - `isTemporalDuration` → `isDuration`
  - `isTemporalTime` → `isPlainTime`

**NEW MONADIC INFRASTRUCTURE:**
- **Validation<T>** monad for error accumulation (vs Result's short-circuiting)
- **ValidationError** type with field/messages structure
- **NonEmptyArray<T>** type for guaranteed non-empty collections
- Helper functions: createValidator, validateAll, combineValidations, combineErrors
- Semigroup error combining (groups by field, merges messages)
- Test configuration updated to allow tests in src/ alongside source code

**FIXED CRITICAL VIOLATIONS:**
- Bang operators (!) replaced with `not` function in all migrated functions
- Helper functions extracted to separate folders following one-function-per-file rule
- Date API replaced with Temporal.Now.plainDateISO() where applicable
- OOP methods (.test, .split, .map, .join, .reduce) replaced with toolkit functions
- One function per file rule enforced strictly
- Types moved to types folders (e.g., HexColorOptions, HexColorFormat)
- Regular expressions extracted to named constants for clarity
- Import paths corrected to use relative paths from simple/ folder

### What To Do Next

1. **Find unmigrated validation functions:**
   ```bash
   grep -l "^/\*\*" libraries/toolkit/src/simple/validation/*/index.ts | head -5
   ```

2. **Pick 5 functions** and migrate them following the established pattern

3. **Check for FP violations** - watch for:
   - Bang operators (`!`) → use `not` function
   - OOP methods (`.test()`) → use toolkit functions (`test`)
   - Helper functions in same file → extract to separate folders
   - `let`/`var` → use `const` only
   - Legacy Date API → use Temporal

4. **Type check** the functions (ignore pre-existing Temporal polyfill errors)

5. **Run tests** to ensure functionality preserved

6. **Commit in batches** of 3-5 functions with descriptive commit messages

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
git add -A && git commit -m "feat: migrate X validation functions to Scribe syntax

- function1: brief description
- function2: brief description  
- etc.

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

2. **Wrong function syntax** - Must use `function` keyword, not arrows

3. **Missing inner function names** - Inner functions need descriptive names

4. **Verbose examples** - Keep `//?? [EXAMPLE]` lines concise with inline results

5. **Ignoring the rules** - Re-read `/CLAUDE.md` if you're unsure

### Success Criteria
- Function works identically to before
- No FP violations (bang operators, OOP methods, helpers in same file)
- Named function with descriptive inner function name
- Scribe documentation follows established pattern
- Tests pass (toolkit now supports tests in src/)
- Type checks pass (ignore Temporal polyfill errors)
- Commit message follows conventional format

### New Monad Infrastructure Available

**For TK2 (lifted functions):**
- `Validation<T>` monad for error accumulation 
- `Result<T>` monad for short-circuiting (existing)
- `ValidationError` type for structured errors
- Helper functions: createValidator, validateAll, combineValidations

**Key Distinction:**
- **Result**: fails fast (first error stops chain)
- **Validation**: accumulates all errors (great for form validation)

### After Each Batch
- Commit 3-5 functions at a time
- Write clear commit messages  
- Push to keep work backed up
- Update this prompt if you discover new patterns or issues

**Remember: The Architect is watching. Follow the FP rules strictly. One function per file. No exceptions.**