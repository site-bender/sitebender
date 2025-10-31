# Toolsmith Skill Examples

This directory contains 13 comprehensive examples demonstrating how to implement Toolsmith library functions using the pragmatic internal approach.

## Purpose

These examples show:
- When and how to use raw operators internally (with exception documentation)
- Currying patterns (unary, binary, ternary)
- Monadic behavior (Result/Validation/plain value handling)
- Helper delegation patterns
- Type narrowing with predicates
- Discriminated union type guards

**Important:** These examples are for building the Toolsmith library itself. Consuming code should use the `function-implementation` skill instead.

## Example Categories

### 1. Predicates (Type Guards and Boolean Functions)

Predicates can use raw operators internally with proper documentation.

#### `predicates/isArray/index.ts`
**Pattern:** Type guard using native method
**Demonstrates:**
- Using `Array.isArray()` internally
- Type predicate syntax (`value is ReadonlyArray<T>`)
- Exception documentation for native method
- How predicates enable TypeScript type narrowing

**Key Concept:** Predicates return plain boolean and enable type narrowing. They are the foundation for type-safe code throughout Toolsmith.

#### `predicates/isEmpty/index.ts`
**Pattern:** Boolean predicate using property access
**Demonstrates:**
- Using `.length === 0` internally
- Using `&&` operator for combining checks
- Defensive programming with `isArray()` check first
- Exception documentation for raw operators

**Key Concept:** Predicates can use `.length`, `===`, and `&&` internally because they ARE the abstraction that consuming code uses.

### 2. Logic Functions (Operator Substitutes)

Logic functions MUST use raw operators because they implement the operator substitutes.

#### `logic/not/index.ts`
**Pattern:** The canonical exception example
**Demonstrates:**
- Using `!` operator internally (the ONLY place it's allowed)
- This IS what consuming code calls instead of `!`
- Unary function (single parameter)
- Critical exception documentation

**Key Concept:** This is the ONLY place the `!` operator is permitted in Toolsmith. Everywhere else (including other Toolsmith functions) should use `not()`.

#### `logic/and/index.ts`
**Pattern:** Binary curried logic function
**Demonstrates:**
- Using `&&` operator internally
- Binary currying (two nested functions)
- Converting to boolean for guaranteed boolean return
- Partial application benefits

**Key Concept:** Binary currying enables `and(left)(right)` which allows partial application: `const checkLeft = and(condition1)`.

### 3. Array/Map Pattern (Binary Curried with Monadic Overloads)

The `map` function demonstrates how to handle plain arrays, Result monad, and Validation monad.

#### `array/map/index.ts`
**Pattern:** Binary curried function with monadic overloads
**Demonstrates:**
- Binary currying: `map(fn)(array)`
- Three overloaded signatures (plain/Result/Validation)
- Type guards for dispatching to appropriate helper
- Fallthrough behavior for error states
- Using Toolsmith predicates for type narrowing

**Key Concept:** Monadic functions automatically adapt to input type. If you pass a Result, you get a Result back. If you pass plain array, you get plain array back.

#### `array/map/_mapArray/index.ts`
**Pattern:** Private helper delegating to native method
**Demonstrates:**
- Private helper (underscore prefix)
- Delegating to native `.map()` method
- Using Toolsmith predicates for validation
- Exception documentation for native method
- Defensive fallback behavior

**Key Concept:** Private helpers can use native methods (`.map`, `.filter`, `.reduce`) with documentation. They implement pieces of the public API.

#### `array/map/_mapToResult/index.ts`
**Pattern:** Private helper returning Result monad
**Demonstrates:**
- Wrapping native `.map()` inside `ok()`
- Creating structured ValidationError on invalid input
- Result monad error handling (fail-fast)
- Using `error()` for error case, `ok()` for success

**Key Concept:** Result monad provides fail-fast error handling. First error stops processing. Use for sequential operations.

#### `array/map/_mapToValidation/index.ts`
**Pattern:** Private helper returning Validation monad
**Demonstrates:**
- Wrapping native `.map()` inside `success()`
- Creating array of ValidationErrors for `failure()`
- Validation monad error handling (accumulation)
- Using `failure([errors])` for error case, `success()` for success

**Key Concept:** Validation monad provides error accumulation. All errors are collected before reporting. Use for parallel validations (e.g., form validation).

### 4. Array/Reduce Pattern (Ternary Curried with Monadic Overloads)

The `reduce` function demonstrates ternary currying (three parameters = three nested functions).

#### `array/reduce/index.ts`
**Pattern:** Ternary curried function with monadic overloads
**Demonstrates:**
- Ternary currying: `reduce(fn)(initialValue)(array)`
- Three levels of function nesting
- Same monadic overload pattern as `map`
- Partial application at each currying level

**Key Concept:** Ternary currying enables partial application at each level. You can create `sumFromZero = reduce(sum)(0)` and reuse it with different arrays.

#### `array/reduce/_reduceArray/index.ts`
**Pattern:** Ternary curried private helper
**Demonstrates:**
- Three levels of currying in private helper
- Delegating to native `.reduce()` method
- Exception documentation for `.reduce`
- All three parameters captured in nested closures

**Key Concept:** Even private helpers follow full currying pattern. This maintains consistency and enables partial application throughout.

#### `array/reduce/_reduceToResult/index.ts`
**Pattern:** Ternary curried helper with Result monad
**Demonstrates:**
- Three levels of currying with Result return
- Using native `.reduce()` inside `ok()`
- Structured error handling at each validation point
- All three parameters available in innermost function

**Key Concept:** Ternary currying + monadic wrapping. The native operation does the work, monads add error handling.

#### `array/reduce/_reduceToValidation/index.ts`
**Pattern:** Ternary curried helper with Validation monad
**Demonstrates:**
- Three levels of currying with Validation return
- Using native `.reduce()` inside `success()`
- Wrapping errors in arrays for accumulation
- Complete ternary + monadic pattern

**Key Concept:** The only difference from Result version is wrapping errors in arrays: `failure([error])` instead of `error(error)`.

### 5. Type Guards (Discriminated Union Narrowing)

Type guards for monads use property access to check discriminated union tags.

#### `monads/result/isOk/index.ts`
**Pattern:** Discriminated union type guard
**Demonstrates:**
- Using `===` operator to check tag
- Accessing `._tag` property for type narrowing
- Type predicate syntax (`value is Ok<T>`)
- Multiple checks combined (object + has property + tag match)

**Key Concept:** Discriminated unions are checked by examining their tag property. This enables exhaustive type checking and type-safe access to variant-specific fields.

## Pattern Summary

| Pattern | Currying | Monadic | Native Methods | Example |
|---------|----------|---------|----------------|---------|
| Type Guard | Unary | No | Array.isArray() | isArray |
| Boolean Predicate | Unary | No | .length, === | isEmpty |
| Logic Function | Unary/Binary | No | !, &&, \|\| | not, and |
| Array Operation | Binary | Yes | .map() | map |
| Array Reduction | Ternary | Yes | .reduce() | reduce |
| Discriminated Union | Unary | No | ._tag access | isOk |

## Key Learnings

### 1. Exception Documentation is Mandatory

Every use of raw operators or native methods MUST have `//++ [EXCEPTION]` comment explaining:
- What rule is being violated
- Why the exception is necessary
- What consuming code should use instead

### 2. Currying Levels

- **Unary:** Single parameter, no currying needed (predicates, `not`)
- **Binary:** Two levels of nesting (`map`, `and`)
- **Ternary:** Three levels of nesting (`reduce`)

Each level captures parameters in closure for partial application.

### 3. Monadic Behavior

Functions can handle three input types:
- **Plain value:** Direct computation, no error handling
- **Result monad:** Fail-fast error handling (first error stops)
- **Validation monad:** Error accumulation (collect all errors)

Type guards dispatch to appropriate helper based on input type.

### 4. Private Helpers

- Prefixed with underscore (`_mapArray`, `_reduceToResult`)
- Can use native methods with documentation
- Implement pieces of public API
- Follow same currying patterns as public functions

### 5. Using Toolsmith Functions Internally

Even within Toolsmith, use Toolsmith predicates for:
- Type narrowing (`isArray`, `isObject`, `isFunction`)
- Discriminated union narrowing (`isOk`, `isSuccess`)
- Complex validation (`and`, `or`)

Use raw operators for:
- Simple operations (===, >, <)
- Implementing the operator substitutes (not, and, or)
- Performance-critical paths (with documentation)

## How to Use These Examples

1. **Read the skill.md first** to understand the philosophy
2. **Study examples in this order:**
   - Predicates (foundational pattern)
   - Logic functions (canonical exceptions)
   - Map pattern (binary + monadic)
   - Reduce pattern (ternary + monadic)
   - Type guards (discriminated unions)
3. **Follow the patterns** when implementing new Toolsmith functions
4. **Document exceptions** using the format shown in examples
5. **Test thoroughly** - each example should have corresponding tests

## Related Skills

- **function-implementation**: Base structure, when to return Result vs plain values
- **file-system-organization**: Where to place helpers, modularity
- **naming**: Function and parameter naming conventions
- **sitebender-predicates**: Predicate-specific patterns
- **type-definition**: Type guards, branded types, discriminated unions
- **error-handling**: Result/Validation monad usage

## Remember

**These patterns are for building Toolsmith library functions.**

For consuming code (applications, other libraries), use the `function-implementation` skill instead, which enforces strict constitutional rules without internal exceptions.

The key distinction:
- **Building Toolsmith:** Use this toolsmith skill (pragmatic internal approach)
- **Consuming Toolsmith:** Use function-implementation skill (strict constitutional rules)
