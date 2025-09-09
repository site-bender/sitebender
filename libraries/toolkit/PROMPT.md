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

## Project Status: Validation Module Migration

### What We're Doing
Migrating @sitebender/toolkit validation functions from JSDoc to Scribe syntax. This is part of a larger effort to standardize documentation across the entire toolkit.

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

### Current Progress

**COMPLETED:**
- Do-notation system (8 monad implementations with comprehensive tutorial)
- Multiple batches of validation functions including:
  - allPass, anyPass, both, either, equals
  - gt, gte, identical, is, isAfterDate (+ extracted toIsoDateString helper)
  - isAfterDateTime, isAfterInstant, isAfterTime, isAlpha, isAlphanumeric (+ extracted toMillis helper)
  - isArrayLike, isBase64, isBeforeDate, isBeforeDateTime, isBeforeInstant
  - isBeforeTime, isBetweenDates, isBetweenDateTimes, isBetweenTimes, isBlank

**FIXED ISSUES:**
- Mutability violations in isAlpha, isAlphanumeric, and isBase64 (replaced `let pattern` with const concatenation/ternary)
- Timer leak warnings in doTask tests (added sanitizeOps: false for race conditions)

### What To Do Next

1. **Find unmigrated validation functions:**
   ```bash
   grep -l "^/\*\*" libraries/toolkit/src/simple/validation/*/index.ts | head -5
   ```

2. **Pick 5 functions** and migrate them following the established pattern

3. **Check for mutability issues** - watch for `let` or mutable patterns

4. **Type check** the functions (ignore pre-existing Temporal polyfill errors)

5. **Commit in batches** of 3-5 functions with descriptive commit messages

### Workflow Commands
```bash
# Find unmigrated functions
grep -l "^/\*\*" libraries/toolkit/src/simple/validation/*/index.ts

# Type check specific files  
deno check --unstable-temporal path/to/file1.ts path/to/file2.ts

# Run tests if needed
deno test tests/unit/specific/test --allow-all

# Commit with conventional format
git add -A && git commit -m "feat: migrate X validation functions to Scribe syntax

- function1: brief description
- function2: brief description  
- etc.

🤖 Generated with Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### Common Pitfalls to Avoid

1. **Mutability** - Never use `let` or `var`, build strings/objects immutably
2. **Wrong function syntax** - Must use `function` keyword, not arrows
3. **Missing inner function names** - Inner functions need descriptive names
4. **Verbose examples** - Keep `//?? [EXAMPLE]` lines concise with inline results
5. **Ignoring helpers** - Extract pure utility functions to separate files

### Success Criteria
- Function works identically to before
- No `let` or `var` in the code
- Named function with descriptive inner function name
- Scribe documentation follows established pattern
- Type checks pass (ignore Temporal polyfill errors)
- Commit message follows conventional format

### After Each Batch
- Commit 3-5 functions at a time
- Write clear commit messages
- Push to keep work backed up
- Update this prompt if you discover new patterns or issues

**Remember: The goal is consistency across the entire validation module. Every function should follow the exact same Scribe pattern when you're done.**