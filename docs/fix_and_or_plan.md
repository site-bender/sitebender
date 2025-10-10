# Plan for Fixing `and` and `or` Functions

## Problem
The `and` and `or` functions in `libraries/toolsmith/src/logic/` have complex overloads for type guards, predicates, and values, but the implementation returns a union type that conflicts with the specific overload return types. This causes TypeScript errors like "This overload signature is not compatible with its implementation signature."

## Current Implementation
- Functions check if arguments are functions to determine predicate mode vs value mode
- Predicate mode: returns a function `(value: unknown) => boolean`
- Value mode: returns `boolean`
- Overloads try to provide specific types for each mode

## Solution
1. Remove all overloads from both `and` and `or` functions
2. Keep only the implementation signature: `(a: unknown) => (b: unknown) => ((value: unknown) => boolean) | boolean`
3. For value operations (like `and(booleanA)(booleanB)`), it returns `boolean`
4. For predicate operations (like `and(funcA)(funcB)`), it returns a function `(value: unknown) => boolean`
5. Existing code continues to work at runtime
6. TypeScript will infer the union type, which is more flexible

## Benefits
- Eliminates TypeScript overload conflicts
- Maintains backward compatibility
- Simplifies the function signatures
- Zero tech debt - no broken types

## Files to Update
- `libraries/toolsmith/src/logic/and/index.ts`
- `libraries/toolsmith/src/logic/or/index.ts`

## Testing
- Run full test suite to ensure no regressions
- Check that arborist compilation works
- Verify that existing predicate usage still works
