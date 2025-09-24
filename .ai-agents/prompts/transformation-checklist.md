# Transformation Checklist Prompt

## Purpose

This checklist ensures complete and correct transformation of TypeScript files according to the functional programming standards.

## Pre-Transformation Checklist

- [ ] **Update toolsmith inventory**: Run `deno task update-toolsmith-inventory`
- [ ] **Identify target folder**: Know which folder to transform
- [ ] **Backup important files**: Ensure version control is current
- [ ] **Understand the scope**: Read any CLAUDE.md or README files in the folder

## Step 1: Named Functions (Arrow Function Elimination)

### Detection
- [ ] Search for `=>` to find ALL arrow functions
- [ ] Search for `const functionName =` patterns
- [ ] Search for `let functionName =` patterns
- [ ] Search for `var functionName =` patterns
- [ ] Check for arrow functions in:
  - [ ] Variable assignments
  - [ ] Return statements
  - [ ] Function parameters
  - [ ] Array methods (map, filter, reduce callbacks)

### Verification
- [ ] NO arrow functions remain (except in type signatures and comments)
- [ ] ALL curried functions use named functions at EVERY level
- [ ] Export statements are on same line as function declaration
- [ ] Run: `deno check [modified-files]` passes

## Step 2: Replace JavaScript Built-ins

### Equality and Comparison
- [ ] Replace ALL `===` with `isEqual(expected)(actual)`
- [ ] Replace ALL `!==` with `not(isEqual(expected)(actual))` or `isUnequal`
- [ ] Replace ALL `>` with `gt(threshold)(value)`
- [ ] Replace ALL `<` with `lt(threshold)(value)`
- [ ] Replace ALL `>=` with `gte(threshold)(value)`
- [ ] Replace ALL `<=` with `lte(threshold)(value)`

### Logical Operators
- [ ] Replace ALL `&&` with `and` or `allPass`
- [ ] Replace ALL `||` with `or` or `anyPass`
- [ ] Replace ALL `!` with `not`
- [ ] Replace ternary `? :` with explicit if/else or conditional functions

### Type Checking
- [ ] Replace ALL `typeof x === 'string'` with `isString(x)`
- [ ] Replace ALL `typeof x === 'number'` with `isNumber(x)`
- [ ] Replace ALL `typeof x === 'boolean'` with `isBoolean(x)`
- [ ] Replace ALL `typeof x === 'function'` with `isFunction(x)`
- [ ] Replace ALL `typeof x === 'object'` with `isObject(x)`
- [ ] Replace ALL `typeof x === 'undefined'` with `isUndefined(x)`
- [ ] Replace ALL `instanceof` with appropriate validators or `instanceOf`

### Special Values
- [ ] Replace `x === null` with `isNull(x)`
- [ ] Replace `x === undefined` with `isUndefined(x)`
- [ ] Replace `x === Infinity` with `isInfinite(x)` or `isPositiveInfinity(x)`
- [ ] Replace `x === -Infinity` with `isNegativeInfinity(x)`
- [ ] Replace direct `NaN` checks with `isNaN(x)`
- [ ] Replace `Object.is` with curried `is` function

### Array/String Checks
- [ ] Replace `arr.length === 0` with `isEmpty(arr)`
- [ ] Replace `arr.length > 0` with `isNotEmpty(arr)`
- [ ] Replace `str.length === 0` with `isEmpty(str)`
- [ ] Replace `str.length > 0` with `isNotEmpty(str)`

## Step 3: Extract Anonymous Functions

### Detection
- [ ] Search for inline functions in `map` calls
- [ ] Search for inline functions in `filter` calls
- [ ] Search for inline functions in `reduce` calls
- [ ] Search for inline functions in `allPass/anyPass` arrays
- [ ] Search for inline functions in logical compositions

### Action
- [ ] Extract to named functions OR
- [ ] Replace with existing toolsmith functions
- [ ] Ensure NO anonymous functions remain (except comparators)

## Step 4: Type System Updates

### Replace Unknown
- [ ] Replace `unknown` with `Value` in predicates
- [ ] Replace `unknown` with `Serializable` in data operations
- [ ] Use optional parameters: `value?: Value` or `value?: Serializable`
- [ ] Verify no direct use of `unknown` remains

## Step 5: Special Cases

### Check for Exceptions
- [ ] Comparator functions (for sort) keep two parameters
- [ ] Reducer functions (for reduce) keep two parameters
- [ ] Callbacks for JS APIs maintain expected signatures
- [ ] Type casts with arrow syntax are left as-is

### Missing Functions
- [ ] If toolsmith function doesn't exist, STOP and report
- [ ] Do NOT create workarounds
- [ ] Do NOT leave JavaScript built-ins in place

## Step 6: Import Management

### Add Required Imports
- [ ] All toolsmith functions have proper imports
- [ ] Import paths are correct (relative from current file)
- [ ] No duplicate imports
- [ ] No unused imports

### Import Order (if applicable)
1. External/library imports
2. Toolsmith type imports
3. Toolsmith function imports (grouped by category)
4. Local imports

## Step 7: Final Verification

### Code Quality
- [ ] NO arrow functions (except in types/comments)
- [ ] NO JavaScript built-in operators (===, !==, &&, ||, etc.)
- [ ] NO anonymous functions (except required callbacks)
- [ ] NO direct use of `unknown` type
- [ ] NO comments added (unless requested)

### Functionality
- [ ] Original behavior preserved exactly
- [ ] All edge cases handled identically
- [ ] No logic changes introduced

### Type Checking
- [ ] Run: `deno check [file]` for each modified file
- [ ] All type errors resolved
- [ ] No new type errors introduced

## Step 8: Common Mistakes to Avoid

- [ ] NOT thinking `const name = () => {}` is a named function
- [ ] NOT leaving any `===`, `!==`, `&&`, `||` operators
- [ ] NOT using `Object.is` directly (use curried `is`)
- [ ] NOT currying comparator functions
- [ ] NOT adding comments to explain changes
- [ ] NOT skipping complex files
- [ ] NOT creating new functions when toolsmith has equivalent

## Final Sign-off

- [ ] All steps completed for all files in folder
- [ ] No JavaScript built-ins remain
- [ ] No arrow functions remain (except types/comments)
- [ ] All functions properly named and curried
- [ ] Type checking passes
- [ ] Original functionality preserved

## Quick Reference Commands

```bash
# Update toolsmith inventory
deno task update-toolsmith-inventory

# Type check specific file
deno check path/to/file.ts

# Search for arrow functions
grep "=>" path/to/folder -r --include="*.ts"

# Search for equality operators
grep "===" path/to/folder -r --include="*.ts"
grep "!==" path/to/folder -r --include="*.ts"

# Search for logical operators
grep " && " path/to/folder -r --include="*.ts"
grep " || " path/to/folder -r --include="*.ts"
```

## When Complete

1. Report number of files transformed
2. List any issues encountered
3. Confirm all checks pass
4. Note any functions that should be added to toolsmith
