# Logic Functions

**Location**: `src/vanilla/logic/`
**Functions**: 13
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### and
- **Current**: `(p1: (value: T) => value is A) => (p2: (value: A) => value is B) => (value: T) => value is B` OR `(p1: (value: T) => boolean) => (p2: (value: T) => boolean) => (value: T) => boolean` OR `(a: unknown) => (b: unknown) => boolean`
- **Returns**: boolean OR type-guarded predicate
- **Description**: Logical AND with dual mode: 1) Value mode: and(a)(b) returns Boolean(a) && Boolean(b); 2) Predicate mode (same-value): and(p1)(p2)(v) applies both predicates to v, preserving TypeScript narrowing when both are type guards
- **Overloaded**: Yes - value mode OR predicate mode with type guard support
- **Target**: `(p1: Predicate<T>) => (p2: Predicate<T>) => Predicate<T>` OR `(a: unknown) => (b: unknown) => Result<LogicError, boolean>`

### or
- **Current**: `(p1: (value: T) => value is A) => (p2: (value: A) => value is B) => (value: T) => value is A | B` OR `(p1: (value: T) => boolean) => (p2: (value: T) => boolean) => (value: T) => boolean` OR `(a: unknown) => (b: unknown) => boolean`
- **Returns**: boolean OR type-guarded predicate
- **Description**: Logical OR with dual mode: 1) Value mode: or(a)(b) returns Boolean(a) || Boolean(b); 2) Predicate mode (same-value): or(p1)(p2)(v) applies either predicate to v, preserving TypeScript narrowing when both are type guards
- **Overloaded**: Yes - value mode OR predicate mode with type guard support
- **Target**: `(p1: Predicate<T>) => (p2: Predicate<T>) => Predicate<T>` OR `(a: unknown) => (b: unknown) => Result<LogicError, boolean>`

### not
- **Current**: `(value: Value) => boolean`
- **Returns**: boolean
- **Description**: Performs logical NOT operation on a value
- **Target**: `(value: Value) => Result<LogicError, boolean>`

### xor
- **Current**: `(a: unknown) => (b: unknown) => boolean`
- **Returns**: boolean
- **Description**: [NEEDS //++ COMMENT] Exclusive OR operation: returns true if exactly one operand is truthy
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(a: unknown) => (b: unknown) => Result<LogicError, boolean>`

### implies
- **Current**: `(antecedent: unknown) => (consequent: unknown) => boolean`
- **Returns**: boolean
- **Description**: [NEEDS //++ COMMENT] Logical implication: returns !antecedent || Boolean(consequent)
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(antecedent: unknown) => (consequent: unknown) => Result<LogicError, boolean>`

### nand
- **Current**: `(a: unknown) => (b: unknown) => boolean`
- **Returns**: boolean
- **Description**: [NEEDS //++ COMMENT] Logical NAND (NOT AND): returns !(Boolean(a) && Boolean(b))
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(a: unknown) => (b: unknown) => Result<LogicError, boolean>`

### nor
- **Current**: `(a: unknown) => (b: unknown) => boolean`
- **Returns**: boolean
- **Description**: [NEEDS //++ COMMENT] Logical NOR (NOT OR): returns !(Boolean(a) || Boolean(b))
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(a: unknown) => (b: unknown) => Result<LogicError, boolean>`

### iff (also, `ifAndOnlyIf` with alias)
- **Current**: `(a: unknown) => (b: unknown) => boolean`
- **Returns**: boolean
- **Description**: [NEEDS //++ COMMENT] Logical biconditional (if and only if): returns Boolean(a) === Boolean(b)
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(a: unknown) => (b: unknown) => Result<LogicError, boolean>`

### cond (prefer `condition`)
- **Current**: `(pairs: Array<[(value: T) => unknown, (value: T) => R]>) => (value: T) => R | null`
- **Returns**: R | null
- **Description**: [NEEDS //++ COMMENT] Pattern matching: evaluates predicate-transformer pairs, returning the result of the first matching transformer or null
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(pairs: Array<[Predicate<T>, (value: T) => R]>) => (value: T) => Result<LogicError, R>`

### defaultTo
- **Current**: `(defaultValue: T) => (value: T | null | undefined) => T`
- **Returns**: T
- **Description**: [NEEDS //++ COMMENT] Returns value if not null/undefined, otherwise returns defaultValue
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(defaultValue: T) => (value: T | null | undefined) => T`

### ifElse (isn't this a ternary?)
- **Current**: `(predicate: (value: T) => unknown) => (onTrue: (value: T) => R) => (onFalse: (value: T) => R) => (value: T) => R`
- **Returns**: R
- **Description**: [NEEDS //++ COMMENT] Conditional branching: applies onTrue if predicate succeeds, otherwise applies onFalse
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(predicate: Predicate<T>) => (onTrue: (value: T) => R) => (onFalse: (value: T) => R) => (value: T) => R`

### unless
- **Current**: `(predicate: (value: T) => unknown) => (fn: (value: T) => T) => (value: T) => T`
- **Returns**: T
- **Description**: [NEEDS //++ COMMENT] Conditionally applies fn to value only if predicate returns falsy
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(predicate: Predicate<T>) => (fn: (value: T) => T) => (value: T) => T`

### when
- **Current**: `(predicate: (value: T) => unknown) => (fn: (value: T) => T) => (value: T) => T`
- **Returns**: T
- **Description**: [NEEDS //++ COMMENT] Conditionally applies fn to value only if predicate returns truthy
- **Refactor Needed**: Missing //++ description comment; uses arrow function syntax
- **Target**: `(predicate: Predicate<T>) => (fn: (value: T) => T) => (value: T) => T`

---

## Migration Notes

Logic functions have diverse migration patterns depending on their purpose:

### Boolean Operations (and, or, not, xor, nand, nor, iff, implies)
These functions will be converted to Result-returning functions when used in value mode. The monadic versions will:

1. Return `ok(boolean)` when operation succeeds
2. Return `error(LogicError)` for invalid input (though most accept `unknown`)
3. Maintain currying for all multi-parameter functions
4. Preserve type guard support for `and` and `or` in predicate mode

### Control Flow Operations (ifElse, when, unless, cond)
These higher-order functions control execution flow and should remain pure:

1. **ifElse**, **when**, **unless**: Remain unchanged as they are already pure control flow abstractions
2. **cond**: Convert null return to `error(LogicError)` when no pattern matches
3. All maintain referential transparency and composability

### Utility Operations (defaultTo)
The **defaultTo** function is already safe and pure, handling null/undefined explicitly:

1. No monadic wrapping needed - already handles nullish values correctly
2. Returns the appropriate value deterministically
3. Can remain unchanged in current form

---

## Special Considerations

### Dual-Mode Functions

#### and
- **Value mode**: `and(true)(false)` returns `false`
- **Predicate mode**: `and(isString)(isNotEmpty)(value)` returns a type-guarded boolean
- Implementation detects mode via `typeof a === "function" && typeof b === "function"`
- Both predicates must succeed for result to be `true`
- Type guard support allows TypeScript to narrow the type when both guards are present
- Should maintain both modes in monadic version

#### or
- **Value mode**: `or(false)(true)` returns `true`
- **Predicate mode**: `or(isString)(isNumber)(value)` returns a type-guarded boolean
- Implementation detects mode via `typeof a === "function" && typeof b === "function"`
- Either predicate succeeding results in `true`
- Type guard support creates union types: `value is A | B`
- Should maintain both modes in monadic version

### Arrow Function Syntax

Most functions use arrow syntax and need refactoring to named functions:
- **xor** (arrow function)
- **implies** (arrow function)
- **nand** (arrow function)
- **nor** (arrow function)
- **iff** (arrow function)
- **cond** (arrow function, uses `Array.prototype.find`)
- **defaultTo** (arrow function)
- **ifElse** (arrow function)
- **unless** (arrow function)
- **when** (arrow function)

### Missing Documentation

Many functions lack //++ description comments:
- **xor**: Needs description of exclusive OR behavior
- **implies**: Needs description of logical implication
- **nand**: Needs description of NOT AND operation
- **nor**: Needs description of NOT OR operation
- **iff**: Needs description of biconditional (if and only if)
- **cond**: Needs description of pattern matching behavior
- **defaultTo**: Needs description of null-coalescing behavior
- **ifElse**: Needs description of ternary-like branching
- **unless**: Needs description of conditional application (inverse of when)
- **when**: Needs description of conditional application

### Complex Implementations

#### and (dual mode)
- Checks if both parameters are functions to determine mode
- **Value mode**: Converts both to boolean and applies logical AND
- **Predicate mode**: Creates a new predicate that applies both predicates sequentially
- Type overloads preserve TypeScript type narrowing
- Implementation uses nested conditionals for short-circuit evaluation

#### or (dual mode)
- Checks if both parameters are functions to determine mode
- **Value mode**: Converts both to boolean and applies logical OR
- **Predicate mode**: Creates a new predicate that tries first predicate, then second
- Type overloads preserve TypeScript type narrowing with union types
- Implementation uses nested conditionals for short-circuit evaluation

#### cond
- Takes array of [predicate, transformer] pairs
- Uses `Array.prototype.find` to locate first matching predicate
- Returns result of corresponding transformer or `null`
- Should use functional `find` from toolsmith instead of array method
- Null return should become `error(LogicError)` in monadic form

### Predicate Patterns

Several functions work with predicates and should use a standardized `Predicate<T>` type:

```typescript
type Predicate<T> = (value: T) => boolean
```

Functions that should use predicates:
- **and** (predicate mode)
- **or** (predicate mode)
- **cond** (first element of pairs)
- **ifElse** (predicate parameter)
- **unless** (predicate parameter)
- **when** (predicate parameter)

### Null Handling

#### cond
- Returns `null` when no predicate matches
- This is an explicit "no match" condition, not an error
- In monadic form, should return `error({ _tag: 'NoMatchError', ... })`

#### defaultTo
- Explicitly handles `null | undefined` in type signature
- Uses nullish coalescing operator (`??`)
- Returns defaultValue for `null` or `undefined`
- Already safe, no migration needed

### Type Guard Support

#### and
Three overloads provide type narrowing:
1. Type guard overload: `(T => value is A) => (A => value is B) => (T => value is B)`
2. Boolean overload: `(T => boolean) => (T => boolean) => (T => boolean)`
3. Value overload: `(unknown) => (unknown) => boolean`

#### or
Three overloads provide type narrowing:
1. Type guard overload: `(T => value is A) => (A => value is B) => (T => value is A | B)`
2. Boolean overload: `(T => boolean) => (T => boolean) => (T => boolean)`
3. Value overload: `(unknown) => (unknown) => boolean`

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Type Dependencies
- **not** depends on `Value` type from `types/index.ts`
- All predicate-based functions should use `Predicate<T>` type (to be defined)

### Array Operation Dependencies
- **cond** uses `Array.prototype.find` - should migrate to functional `find`

### Refactoring Requirements
Functions needing conversion from arrow to named functions:
- **xor**, **implies**, **nand**, **nor**, **iff** (simple binary operators)
- **cond** (uses array method, needs functional alternative)
- **defaultTo** (simple utility)
- **ifElse**, **unless**, **when** (control flow)

---

## Notes

### Logical Completeness

The library provides a complete set of binary logical operators:
- **and**: Conjunction (∧)
- **or**: Disjunction (∨)
- **not**: Negation (¬)
- **xor**: Exclusive OR (⊕)
- **nand**: Not AND (↑)
- **nor**: Not OR (↓)
- **implies**: Implication (→)
- **iff**: Biconditional (↔)

This covers all common logical operations from propositional logic.

### Control Flow Combinators

The control flow functions provide functional alternatives to imperative constructs:
- **ifElse**: Functional ternary operator
- **when**: Functional if statement (do something if true)
- **unless**: Inverse of when (do something if false)
- **cond**: Functional switch/case statement with pattern matching

### Utility Functions

- **defaultTo**: Provides null-safe default values (like ?? operator)

### Missing Standard Logic Functions

Consider implementing these during migration:
- **both**: Alias for `and` in predicate mode (already covered by `and`)
- **either**: Alias for `or` in predicate mode (already covered by `or`)
- **allPass**: Generalized `and` that takes array of predicates
- **anyPass**: Generalized `or` that takes array of predicates
- **complement**: Returns negation of a predicate (like `not` but for predicates)
- **until**: Repeatedly applies function until predicate is true
- **always**: Returns a constant function (useful in conditionals)
- **T**: Always returns true
- **F**: Always returns false

### Testing Considerations

When migrating, ensure comprehensive tests for:
- Truthy/falsy edge cases (0, '', false, null, undefined, NaN)
- Type guard narrowing in `and` and `or`
- Short-circuit evaluation in `and` and `or`
- Pattern matching exhaustiveness in `cond`
- Edge cases in `implies` (antecedent false, both false, etc.)
- Biconditional truth table for `iff`
- Control flow functions with identity transformations
- **defaultTo** with various nullish values
