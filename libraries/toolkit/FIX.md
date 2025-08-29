# FIX THE DOCS - JSDoc Remediation Plan

## 🔴🔴🔴 CRITICAL WARNING 🔴🔴🔴
**NEVER USE THE TASK TOOL**
**NEVER USE THE TASK TOOL**
**NEVER USE THE TASK TOOL**

The Task tool DESTROYS FILES. It creates broken, non-functional code.
Process EVERY FILE INDIVIDUALLY, ONE AT A TIME, CAREFULLY.
NO SHORTCUTS. NO EXCEPTIONS. EVER.

If you detect any performance constraints or rate limits, immediately inform me rather than attempting workarounds!!!

## 🚀 QUICK START FOR NEXT SESSION
**Status**: 682/765 files complete (89.2%) - Phase 3 IN PROGRESS
**Completed**: Math ✅, Logic ✅, Combinator ✅, Conversion ✅, String ✅, Array ✅, Object ✅, Map ✅, Set ✅, Validation ✅, Temporal ✅, Geometry ✅
**Next**: Continue with `physics/` folder
**Time**: Sessions 1-43 took ~983 minutes total (~16.4 hours)
**Last Session**: Session 43 - Completed temporal/ and geometry/ folders (12 files processed)
**Branch**: phase-2
**CRITICAL**: Process files ONE AT A TIME carefully - no shortcuts!

**READ THE FIRST 150 LINES OF THE `PROGRESS.md` FILE FOR CONTEXT TO SEE WHERE YOU ARE IN THIS PROCESS. AFTER EACH SESSION, UPDATE THE `PROGRESS.md` FILE WITH YOUR CHANGES.**

### ⚠️ INTERFERENCE INCIDENT - Session 30
**Issue**: Another AI working on adaptive/components incorrectly accessed toolkit files
**Result**: NO DAMAGE - all toolkit files verified intact with proper JSDoc and FP implementations
**Prevention**: Commit hooks now in place requiring ALLOW_TOOLKIT=1 flag

### ⚠️ TASK TOOL DAMAGE REPORT
Sessions 24-26 revealed massive damage from Task tool usage:
- Session 24: 10 object files damaged (forEach, mutations, backticks)
- Session 25: 14 map files damaged (similar issues)
- Session 26: Emergency fixes for critical failures
- Fixed: xform, reject, propSatisfies, renameKeys, toPairsIn, transform, 
  without, zipObject, smartMerge, set, toMap, toPairs, values
- Session 27 (cleanup): Fixed accumulate (missing export), omit (wrong import), 
  smartMerge (@property tags), toPairsIn (for...in loop), clone (.map misuse)
- ALL had imperative code patterns (forEach, for...in, mutations)

## IMPORTANT: Starting a New Session?

1. **READ THIS FILE FIRST** for context on what we're doing
2. **THEN READ `/CLAUDE.md`** for project rules (STRICT FP, no mutations, etc.)
3. **Continue from "Next Up" section below** - continue with remaining `set/` files
4. **DO NOT use Task tool** - process files ONE AT A TIME carefully (Task tool doesn't do thorough work)
5. **CRITICAL: WORK ONLY IN `libraries/toolkit/` folder - DO NOT TOUCH OTHER FOLDERS**
   - **NEVER modify files in `libraries/adaptive/`** - another AI is working there
   - **NEVER modify files in `libraries/components/`** - another AI is working there
   - **ONLY commit changes from `libraries/toolkit/`**
6. **Track time** with timestamps before/after each session
7. **SESSION WORKFLOW**:
   - Process EXACTLY 12 files (cross folders if needed)
   - Update FIX.md with complete session details
   - Commit changes using best practices
   - Report completion and STOP

### CRITICAL REMINDERS FOR NEXT SESSION
- **BATCH SIZE**: Process EXACTLY 12 files per session (ONE AT A TIME, not with Task tool)
- **PROCESS**: Complete 12 files → Update FIX.md → Commit changes → Report and STOP
- **CROSS FOLDERS**: If needed to reach 12 files, continue into next folder
- **CHECK FOR DUPLICATE TAGS**: Many files have @curried in description AND at bottom - remove duplicates!
- **@curried ONLY for functions that return functions**: Not all functions need @curried
- **Read files first**: Check existing tags before adding new ones
- **Fix imperative code**: Replace `for`, `while`, `let`, `forEach`, mutations with FP patterns
- **Reduce examples**: Most have 40-180 lines, reduce to 8-10 meaningful examples
- **@impure for stateful**: memoize, debounce, throttle, once, tap need @impure tag
- **@predicate for boolean returns**: Functions returning boolean get @predicate tag
- **Valid TypeScript only**: All examples must compile

## Executive Summary

**Total Functions to Fix**: 765 functions across `libraries/toolkit/src`
**Completed So Far**: 646/765 files (84.4%) - Phase 3 IN PROGRESS
**Average Time**: ~1.38 minutes per file
**Optimal Approach**: Process ONE FILE AT A TIME carefully (NEVER use Task tool)
**Next Session**: Continue `temporal/` folder (37 files remaining)

## Problems Identified

### 1. CRITICAL: Non-FP Examples in FP Library

- **336 files** contain imperative code in examples
- Found 882+ occurrences of:
  - `let` declarations (should be `const`)
  - `for` loops (should use FP iteration)
  - Mutating array methods (`.push()`, `.pop()`, `.splice()`, etc.)
  - Increment/decrement operators (`++`, `--`)
  - `.forEach()` (should use `.map()`, `.reduce()`, etc.)

### 2. Invalid TypeScript Examples

- Examples show impossible type usage (e.g., passing strings to number-only parameters)
- Runtime validation code that TypeScript would prevent at compile time
- Misleading users about function capabilities

### 3. Excessive Examples

- Some functions have 50+ examples (e.g., `add` has ~170 lines of examples!)
- Slows down test creation (every example must be tested)
- Most examples are:
  - **Redundant** - showing the same concept multiple times
  - **Trivial** - adding no educational value
  - **Overly niche** - edge cases nobody will encounter
- Need to reduce to 8-12 meaningful examples per function

### 4. Incorrect @property Tag Usage

- Misusing `@property` for function characteristics
- Should be custom tags: `@pure`, `@curried`, `@idempotent`, etc.
- Inconsistent capitalization (idempotent vs Pure)

### 5. Missing Type Guards in Examples

- Examples don't show proper FP error handling patterns
- Should demonstrate Result/Either/Maybe usage where appropriate

## Fix Strategy

### Custom JSDoc Tags to Implement

```typescript
/**
 * @pure - Function has no side effects
 * @curried - Function is curried for partial application
 * @idempotent - f(f(x)) = f(x)
 * @commutative - f(a, b) = f(b, a)
 * @associative - f(f(a, b), c) = f(a, f(b, c))
 * @immutable - Does not modify inputs
 * @predicate - Returns boolean (for is* functions)
 * @safe - Returns NaN/null/empty for invalid inputs
 * @impure - Has side effects (for random functions)
 */
```

### KEY REMINDERS FOR NEW SESSIONS

- **WORK ONLY IN** `libraries/toolkit/` folder
- **DO NOT use Task tool** - it doesn't do thorough work, process files ONE AT A TIME
- **Remove ALL imperative code** - no let, for, while, forEach, mutations
- **Fix invalid TypeScript** - don't show strings passed to number params
- **8-12 examples max** - remove trivial, duplicative, niche examples
- **Track timestamps** before/after each session

### Example Guidelines

1. **Target 8-12 examples per function** (fewer for simple functions)
2. **Remove these types of examples**:
   - **Useless/trivial** - examples that add no value
   - **Duplicative** - examples showing the same concept repeatedly
   - **Ridiculously niche** - overly specific edge cases nobody will use
   - **Invalid TypeScript** - examples that won't compile
3. **Keep only essential examples**:
   - Basic usage (1-2 examples)
   - Common use cases (2-3 examples)
   - Important edge cases (1-2 examples)
   - Composition/partial application (1-2 examples)
   - One complex real-world usage
4. **Pure FP style only**:
   - Use `const` exclusively
   - Use recursion or FP methods (map, reduce, filter)
   - Show composition and partial application
   - No mutation, no side effects
5. **Valid TypeScript only** - examples must compile

### Batch Processing Plan

#### Session Structure (Updated approach)

1. **Session Size**: EXACTLY 12 files per session
2. **Time per session**: ~40-50 minutes
3. **Process ONE FILE AT A TIME**:
   - Read each file first
   - Fix @property tags → custom tags
   - Reduce examples to 8-10 essential ones
   - Rewrite examples in pure FP style
   - Remove invalid TypeScript examples
   - Use MultiEdit for all changes
4. **End of Session Protocol**:
   - Complete exactly 12 files
   - Update FIX.md with detailed progress
   - Commit all changes with proper git message
    - **When you commit, only add files in the `libraries/toolkit` folder**. There is no point in adding all files, saying "oops", and then backing out the non-toolkit files. Be smart.
    - When you do commit, include the ALLOW_TOOLKIT=1 flag or you will just have to do it again with the flag. Again, be smart.
   - Report to user and STOP

#### Folder Processing Order (by complexity)

1. **Phase 1 - Simple Functions** ✅ COMPLETE (209 files)
   - `math/` (54 files) ✅
   - `logic/` (13 files) ✅
   - `combinator/` (49 files) ✅
   - `conversion/` (16 files) ✅
   - `string/` (77 files) ✅

2. **Phase 2 - Medium Complexity** ✅ COMPLETE (245 files)
   - `array/` (123 files) ✅ - COMPLETE!
   - `object/` (56 files) ✅ - COMPLETE!
   - `map/` (40 files) ✅ - COMPLETE!
   - `set/` (26 files) ✅ - COMPLETE!

3. **Phase 3 - Complex/Domain** IN PROGRESS (155 files remaining, ~13 sessions)
   - `validation/` (106 files) ✅ - COMPLETE!
   - `temporal/` (79 files) - IN PROGRESS - 6 files complete
   - `geometry/` (9 files), `physics/` (10 files), `finance/` (11 files) - domain-specific
   - `matrix/` (9 files), `statistics/` (15 files), `special/` (7 files) - mathematical
   - `functional/` (21 files) - advanced FP patterns

## Tracking Template

## 📝 IMPORTANT: Session Logs Location

**SESSION LOGS GO IN THE PROGRESS.md FILE, NOT HERE!**
**SESSION LOGS GO IN THE PROGRESS.md FILE, NOT HERE!**
**SESSION LOGS GO IN THE PROGRESS.md FILE, NOT HERE!**

All session tracking and progress logs should be recorded in `PROGRESS.md` in descending chronological order (newest first). This FIX.md file contains the plan and instructions only.

### Running Totals

- **Total Sessions**: 52
- **Files Completed**: 760/765 (99.3%)
- **Total Time Spent**: ~1203 minutes (20.05 hours)
- **Average Time per File**: 1.58 minutes
- **Estimated Completion**: ~20.13 hours total (at current pace)
- **Remaining Files**: 5 (all in tuple)

## Quality Checklist per File

- [ ] All @property tags converted to custom tags
- [ ] Examples reduced to 8-12 essential ones (fewer for simple functions)
- [ ] Removed all useless/trivial examples
- [ ] Removed all duplicative examples
- [ ] Removed ridiculously niche examples
- [ ] All examples use pure FP style (const only, no mutations)
- [ ] All examples are valid TypeScript
- [ ] Examples demonstrate key use cases and edge cases
- [ ] Examples show composition where relevant
- [ ] No `let`, `for`, `forEach`, `++`, `--`, `.push()`, etc.

## Example Transformation

### Before (BAD):

```typescript
/**
 * @property Immutable - doesn't modify input
 * @example
 * let result = [];
 * for (let i = 0; i < arr.length; i++) {
 *   result.push(transform(arr[i]));
 * }
 *
 * // Invalid TypeScript
 * add("5")(3) // NaN
 */
```

### After (GOOD):

```typescript
/**
 * @pure
 * @immutable
 * @curried
 * @example
 * // Basic usage
 * const result = map(transform)(arr)
 *
 * // Composition
 * const pipeline = pipe(
 *   filter(isValid),
 *   map(transform),
 *   reduce(combine, initial)
 * )
 *
 * // Edge cases
 * map(fn)(null) // []
 * map(fn)([])   // []
 */
```

## Next Up: Phase 2 Continues

**Phase 1 ✅ COMPLETE** - All simple functions done!

**Phase 2 folders to process:**

1. `array/` (123 files) ✅ COMPLETE!
   - Session 10: aperture through dropWhile
   - Sessions 11-12: endsWith through init
   - Session 13: insertAt through lastIndexOfMatch
   - Session 14: map through nubBy
   - Session 15: omit through reduceRight
   - Session 16: reduceWhile through replaceFirst
   - Session 17: replaceFirstMatch through shuffle
   - Session 18: slice through splitEvery
   - Session 19: startsWith through times
   - Session 20: toSet through zipWith (final 14 files)
2. `object/` (56 files) ✅ COMPLETE!
   - Session 21-22: accumulate through lensProp (20 files)
   - Session 23: mapKeys through partitionBy (10 files) 
   - Session 24: path through values (20 files)
   - Session 25: view through zipObject (6 files - folder complete)
3. `map/` (40 files) ✅ COMPLETE!
   - Session 25: clear through get (14 files) - WARNING: Used Task tool incorrectly
   - Session 26: FIXED Session 25 files + processed getOr, groupBy, has (16 total)
   - Session 28: interleave through toObject (20 files - folder complete)
4. `set/` (26 files) - IN PROGRESS
   - Session 29: add through isSupersetOf (20 files)
   - Remaining: map, partitionBy, reduce, size, sliding, symmetricDifference (6 files)

---

## Success Metrics

- Zero imperative code in examples
- All examples compile with TypeScript strict mode
- Average 8-12 examples per function (fewer for simple functions)
- Removed all redundant, trivial, and overly niche examples
- Consistent use of custom JSDoc tags
- Test suite can run all examples efficiently

_This plan and the PROGRESS.md file will be updated after each session with progress metrics and time estimates._
