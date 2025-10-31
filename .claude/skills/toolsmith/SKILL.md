---
name: toolsmith
description: Patterns for implementing Toolsmith library functions. Covers pragmatic internal approach using raw operators with exception documentation, monadic behavior patterns (Result/Validation/plain value), predicate special rules, and the distinction between building Toolsmith vs consuming it. Use when implementing functions FOR the Toolsmith library itself.
---

# Toolsmith Library Implementation

## Core Principle

**The Toolsmith library provides semantic functions for consuming code, but uses pragmatic implementation internally.**

Toolsmith exports functions like `not()`, `isEmpty()`, and `isEqual()` that consuming code MUST use instead of raw operators. But internally, Toolsmith implementations CAN use raw operators (`!`, `&&`, `===`, `.length`, etc.) with documented exceptions. This is pragmatic: we provide the abstraction boundary, we don't re-abstract ourselves internally.

**The Key Distinction:**
- **Consuming code** (applications using Toolsmith): MUST use semantic functions, NO raw operators
- **Toolsmith internals** (building Toolsmith itself): CAN use raw operators with exception documentation

## When to Use This Skill

Use this skill when:
- **Implementing functions FOR the Toolsmith library** (in `libraries/toolsmith/src/`)
- Writing predicates (type guards, boolean checks)
- Creating array/object/string/math utilities
- Building monadic functions (Result, Validation)
- Understanding Toolsmith's internal architecture
- Distinguishing internal implementation from external API

**DO NOT use this skill when:**
- Writing application code that CONSUMES Toolsmith
- Implementing functions in OTHER libraries (warden, steward, sentinel, etc.)
- For consuming code, use the `function-implementation` skill instead

**This skill is for library authors building Toolsmith. If you're consuming Toolsmith, use `function-implementation` skill.**

## Philosophical Context

### The Pragmatic Boundary

**External API (Consuming Code Perspective):**
- MUST use Toolsmith functions (`not`, `isEmpty`, `isEqual`, `and`, `or`)
- MUST NOT use raw operators directly (`!`, `===`, `&&`, `||`, `.length`)
- Follows strict constitutional rules
- Benefits from monadic error handling
- Gets semantic, readable code

**Internal Implementation (Toolsmith Library Perspective):**
- CAN use raw operators (`!`, `===`, `&&`, `||`, `.length`, etc.)
- CAN use native methods (`.map`, `.filter`, `.reduce`, etc.)
- MUST document exceptions with `//++ [EXCEPTION]` comments
- MUST provide semantic public API
- MUST remain pure (no mutations, no side effects except IO boundaries)

**Why This Approach:**

1. **Performance**: Native operators are heavily optimized by JavaScript engines
   - `===` is a single CPU instruction
   - `isEqual(a)(b)` requires function call overhead (2 calls due to currying), stack frames, parameter passing
   - For code executed millions of times, this matters

2. **Readability**: Operators are universally understood
   - `Array.isArray(value) && value.length === 0` is immediately clear to any JavaScript developer
   - `and(isArray(value))(isEqual(0)(length(value)))` requires mental parsing of nested curried calls
   - Lower cognitive load for library maintainers

3. **Simplicity**: Toolsmith IMPLEMENTS the abstractions; it doesn't consume them
   - We're the abstraction layer, not the consumers
   - No need to wrap what we're wrapping

4. **Encapsulation**: The consumer never sees internal implementation
   - Internal use of `&&` is encapsulated behind `and()` function
   - Consumers see: `and(condition1)(condition2)`
   - They don't care if internally we use `&&`
   - The abstraction boundary is the function interface, not the implementation

5. **Type Safety**: Predicates need raw access for TypeScript type narrowing
   - `value._tag === "Ok"` enables discriminated union narrowing
   - Type guards require access to internals

### Performance vs Abstraction Trade-off

**For Toolsmith internals, prioritize:**
- Performance (use native operators)
- Readability (use familiar syntax)
- Maintainability (clear, simple code)

**For Toolsmith PUBLIC API, provide:**
- Semantic functions (not, and, or, isEmpty, isEqual)
- Monadic behavior (Result/Validation handling)
- Type safety (branded types, type guards)

**The balance:** Use pragmatic implementation internally to provide powerful abstractions externally.

## Constitutional Rules That STILL Apply

Even in Toolsmith internals, these rules are **MANDATORY** and **NON-NEGOTIABLE**:

### 1. No Classes ✅ MANDATORY
```typescript
// ❌ FORBIDDEN - even in Toolsmith
class Validator {
  validate() { }
}

// ✅ CORRECT - use modules with functions
export default function validate(value: unknown) {
  // ...
}
```

### 2. No Mutations ✅ MANDATORY
```typescript
// ❌ FORBIDDEN - mutations not allowed
const result = []
array.forEach(item => result.push(item))

let count = 0
count++

// ✅ CORRECT - immutable data
const result = array.map(transform)
const count = array.length
```

**Exception:** IO boundaries (state management, localStorage) with `//++ [IO]` comment

### 3. No Loops ✅ MANDATORY (with generator exception)
```typescript
// ❌ FORBIDDEN - no loops
for (let i = 0; i < array.length; i++) {
  process(array[i])
}

while (condition) {
  doSomething()
}

// ✅ CORRECT - use map/filter/reduce
array.map(process)

// ✅ EXCEPTION - generators may use loops
export default function* range(start: number) {
  return function* rangeFrom(end: number): Generator<number> {
    //++ [EXCEPTION] Using let and for loop in generator for performance
    //++ Generators are allowed to use imperative iteration internally
    //++ They produce immutable sequences externally
    for (let i = start; i <= end; i++) {
      yield i
    }
  }
}
```

### 4. Named Functions Only ✅ MANDATORY
```typescript
// ❌ FORBIDDEN - arrow functions
const add = (a: number, b: number) => a + b

// ✅ CORRECT - named function declarations
export default function add(augend: number) {
  return function addToAugend(addend: number): number {
    return augend + addend
  }
}

// ✅ EXCEPTION - arrow syntax OK in type signatures only
type Mapper<T, U> = (value: T) => U
```

### 5. One Function Per File ✅ MANDATORY
```typescript
// ❌ FORBIDDEN - multiple exports
export function add(a, b) { }
export function subtract(a, b) { }

// ✅ CORRECT - one export per file
// File: add/index.ts
export default function add(augend: number) { }

// File: subtract/index.ts
export default function subtract(minuend: number) { }
```

### 6. Curried When Multi-Parameter ✅ MANDATORY
```typescript
// ❌ FORBIDDEN - multiple parameters (unless uncurried callback for native method)
export default function add(a: number, b: number): number {
  return a + b
}

// ✅ CORRECT - curried
export default function add(augend: number) {
  return function addToAugend(addend: number): number {
    return augend + addend
  }
}

// ✅ EXCEPTION - uncurried callbacks passed to native methods
// When delegating to .map, .filter, .reduce, we accept uncurried callbacks
// to avoid curry/uncurry overhead
export default function map<T, U>(f: (arg: T, index?: number) => U) {
  // Accept uncurried callback because we delegate to native .map(f)
  return function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U> {
    return array.map(f)  // Native method expects uncurried callback
  }
}
```

### 7. Pure Functions ✅ MANDATORY (except IO boundaries)
```typescript
// ❌ FORBIDDEN - side effects
let cache = {}
export default function memoize(value: number) {
  cache[value] = compute(value)  // Mutating external state
  return cache[value]
}

// ✅ CORRECT - pure function
export default function compute(value: number): number {
  return value * 2
}

// ✅ EXCEPTION - IO boundaries with //++ [IO] comment
export default function persistToLocalStorage(key: string) {
  return function persistWithKey(value: string): Result<Error, void> {
    //++ [IO] This function performs localStorage side effects
    try {
      localStorage.setItem(key, value)
      return ok(undefined)
    } catch (error) {
      return error(error as Error)
    }
  }
}
```

**These rules apply everywhere in Toolsmith, always, with documented exceptions only.**

## Constitutional Rules That DON'T Apply Internally

These rules apply to CONSUMING code but NOT to Toolsmith internals:

### 1. Raw Operators Permitted ✅ ALLOWED

**CAN use:**
- `!` for negation
- `&&`, `||` for logic
- `===`, `!==` for equality
- `>`, `<`, `>=`, `<=` for comparison
- `.length` for length checks
- `typeof` for type checking
- `instanceof` for instance checking
- `Array.isArray()` for array checking
- `Object.is()` for SameValue comparison
- `Object.keys()`, `Object.values()`, `Object.entries()` for object operations

**MUST document:**
```typescript
//++ [EXCEPTION] reason for using raw operator
//++ What external code should use instead
implementation
```

### 2. Native Methods Permitted ✅ ALLOWED

**CAN delegate to:**
- `.map()`, `.filter()`, `.reduce()`, `.find()`, `.some()`, `.every()`
- `.slice()`, `.concat()`, `.join()`, `.split()`
- `.keys()`, `.values()`, `.entries()`
- `.toUpperCase()`, `.toLowerCase()`, `.trim()`

**MUST document:**
```typescript
//++ [EXCEPTION] Using native .map for internal implementation
//++ External code uses our map() function from Toolsmith
return array.map(fn)
```

### 3. Object Property Access Permitted ✅ ALLOWED

**CAN access properties** when implementing predicates or type guards:

```typescript
export default function isOk<T>(value: unknown): value is Ok<T> {
  //++ [EXCEPTION] Accessing ._tag for discriminated union narrowing
  //++ This is the standard pattern for type guards
  return isObject(value) && "_tag" in value && value._tag === "Ok"
}
```

## Exception Documentation Pattern

### Required Format

Every use of raw operators or native methods MUST be documented:

```typescript
//++ [EXCEPTION] What rule is being violated and why
//++ What consuming code should use instead (if applicable)
//++ Any additional context (performance, type narrowing, etc.)
implementation using raw operator/method
```

### Examples by Category

#### Logical Operators

```typescript
//++ [EXCEPTION] This is the ONLY permitted use of the ! operator
//++ Everywhere else, use this `not` function instead
return !value
```

```typescript
//++ [EXCEPTION] Using && for internal logic
//++ External code uses and() or allPass()
return Boolean(left) && Boolean(right)
```

```typescript
//++ [EXCEPTION] Using || for internal fallback
//++ External code uses or() or anyPass()
return value || defaultValue
```

#### Comparison Operators

```typescript
//++ [EXCEPTION] Using === for internal comparison
//++ External code uses isEqual() or is()
return a === b
```

```typescript
//++ [EXCEPTION] Using > for numeric comparison
//++ External code uses isGreaterThan()
return a > b
```

#### Property Access

```typescript
//++ [EXCEPTION] Using .length for array length check
//++ External code uses isEmpty() or isNotEmpty()
return array.length === 0
```

```typescript
//++ [EXCEPTION] Accessing ._tag for type narrowing
//++ This is the standard discriminated union pattern
return value._tag === "Ok"
```

```typescript
//++ [EXCEPTION] Using typeof for primitive type check
//++ External code uses isString(), isNumber(), etc.
return typeof value === "string"
```

#### Native Methods

```typescript
//++ [EXCEPTION] Using native .filter() to implement our filter() function
//++ External code uses our filter() function from Toolsmith
return array.filter(predicate)
```

```typescript
//++ [EXCEPTION] Using Array.isArray for type guard
//++ External code uses our isArray() function
return Array.isArray(value)
```

```typescript
//++ [EXCEPTION] Using native .map() for internal helper
//++ External code uses our map() function, not .map
//++ This is a private helper implementing the public API
return array.map(f)
```

#### Type Checking

```typescript
//++ [EXCEPTION] Using typeof for primitive type checking
//++ This is a primitive type guard with no higher-level abstraction
return typeof value === "string"
```

```typescript
//++ [EXCEPTION] Using instanceof for class checking
//++ External code uses appropriate type guards
return value instanceof Error
```

## Patterns

### Pattern 1: Predicates (Type Guards and Boolean Functions)

**Purpose:** Predicates have special status - they can use raw operators internally

**When:** Creating any function returning boolean or performing TypeScript type narrowing

**Characteristics:**
- Use raw operators for checks
- Document exceptions
- Type predicate syntax for narrowing (`value is Type`)
- No need to use Toolsmith functions internally (we ARE the Toolsmith functions)

**Structure:**

```typescript
export default function isArray<T = unknown>(value: unknown): value is ReadonlyArray<T> {
  //++ [EXCEPTION] Using native Array.isArray for type narrowing
  //++ External code uses this isArray() function instead
  return Array.isArray(value)
}
```

**Examples:**

```typescript
// Simple type guard
export default function isString(value: unknown): value is string {
  //++ [EXCEPTION] Using typeof for primitive type check
  //++ External code uses this isString() function
  return typeof value === "string"
}

// Discriminated union type guard
export default function isOk<T>(value: unknown): value is Ok<T> {
  //++ [EXCEPTION] Accessing ._tag for discriminated union narrowing
  //++ Standard pattern for type guards
  return isObject(value) && "_tag" in value && value._tag === "Ok"
}

// Boolean check (not a type guard)
export default function isEmpty<T>(array: ReadonlyArray<T>): boolean {
  //++ [EXCEPTION] Using .length for emptiness check
  //++ External code uses this isEmpty() function instead
  return isArray(array) && array.length === 0
}
```

**Key Points:**
- Predicates return plain `boolean` (not wrapped in Result/Validation)
- Can use `===`, `typeof`, `.length`, native methods freely
- Must still document exceptions
- Used extensively even within Toolsmith for type narrowing

### Pattern 2: Monadic Behavior (Overloaded Signatures)

**Purpose:** Functions that handle plain values AND monads

**When:** Creating utilities that work with Result/Validation/plain values

**Characteristics:**
- Multiple overloaded signatures for each input/output combination
- Implementation handles all cases with type guards
- Fallthrough behavior: pass errors unchanged
- Use Toolsmith predicates for type narrowing even internally

**Structure:**

```typescript
export default function map<T, U>(f: (arg: T, index?: number) => U) {
  //++ [OVERLOAD] Plain array → plain array
  function mapWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U>

  //++ [OVERLOAD] Result monad → Result monad (fail-fast)
  function mapWithFunction(
    array: Result<ValidationError, ReadonlyArray<T>>
  ): Result<ValidationError, ReadonlyArray<U>>

  //++ [OVERLOAD] Validation monad → Validation monad (error accumulation)
  function mapWithFunction(
    array: Validation<ValidationError, ReadonlyArray<T>>
  ): Validation<ValidationError, ReadonlyArray<U>>

  //++ Implementation handles all overload cases
  function mapWithFunction(
    array:
      | ReadonlyArray<T>
      | Result<ValidationError, ReadonlyArray<T>>
      | Validation<ValidationError, ReadonlyArray<T>>
  ):
    | ReadonlyArray<U>
    | Result<ValidationError, ReadonlyArray<U>>
    | Validation<ValidationError, ReadonlyArray<U>> {

    // Use Toolsmith predicates for type narrowing even internally
    if (isArray<T>(array)) {
      return _mapArray(f)(array)
    }

    if (isOk<ReadonlyArray<T>>(array)) {
      return chainResults(_mapToResult(f))(array)
    }

    if (isSuccess<ReadonlyArray<T>>(array)) {
      return chainValidations(_mapToValidation(f))(array)
    }

    // Fallback: pass through unchanged (handles error/failure states)
    return array
  }

  return mapWithFunction
}
```

**Key Points:**
- Overload signatures declare all supported input/output combinations
- Implementation signature is most general (union of all)
- Use Toolsmith type guards (`isArray`, `isOk`, `isSuccess`) to narrow and dispatch
- Delegate to private helpers for each path
- Fallthrough behavior: pass errors unchanged (important for monadic composition)

**When to Use Each Monad:**
- **Plain value**: Direct computation, no error handling
- **Result monad**: Fail-fast error handling (first error stops processing)
- **Validation monad**: Error accumulation (collect all errors before failing)

### Pattern 3: Private Helpers with Raw Operators

**Purpose:** Internal implementation details can use raw operators

**When:** Extracting logic into private helper functions (prefixed with `_`)

**Structure:**

```typescript
// In map/_mapArray/index.ts
export default function _mapArray<T, U>(f: (arg: T, index?: number) => U) {
  return function _mapArrayWithFunction(array: ReadonlyArray<T>): ReadonlyArray<U> {
    // Use Toolsmith predicates for validation even in helpers
    if (and(isFunction(f))(isArray(array))) {
      //++ [EXCEPTION] Using native .map for internal helper
      //++ External code uses our map() function, not .map
      //++ This is a private helper implementing the public API
      return array.map(f)
    }

    // Fallback: return unchanged
    return array as unknown as ReadonlyArray<U>
  }
}
```

**Key Points:**
- Private helpers (`_name`) also use raw operators with documentation
- Must still document exceptions
- Implement pieces of public API
- Follow same currying patterns as public functions
- Use Toolsmith predicates for validation even internally

### Pattern 4: Logical Operations

**Purpose:** Implement logical functions like not, and, or

**When:** Creating fundamental logic utilities

**Structure:**

```typescript
// not: Unary logical operation
export default function not(value: Value): boolean {
  //++ [EXCEPTION] This is the ONLY permitted use of the ! operator
  //++ Everywhere else, use this `not` function instead
  return !value
}

// and: Binary curried logical operation
export default function and(left: Value) {
  return function andWithLeft(right: Value): boolean {
    //++ [EXCEPTION] Using && for internal logic
    //++ External code uses this and() function or allPass()
    //++ Convert both to boolean first for guaranteed boolean return
    return Boolean(left) && Boolean(right)
  }
}

// or: Binary curried logical operation
export default function or(left: Value) {
  return function orWithLeft(right: Value): boolean {
    //++ [EXCEPTION] Using || for internal logic
    //++ External code uses this or() function or anyPass()
    //++ Convert both to boolean first for guaranteed boolean return
    return Boolean(left) || Boolean(right)
  }
}
```

**Key Points:**
- These ARE the operator substitutes, so they MUST use the raw operators
- Document that external code uses THESE functions instead of operators
- Ensure boolean return (use `Boolean()` conversion if needed)
- These are the ONLY places `!`, `&&`, `||` are allowed

### Pattern 5: Ternary Curried Functions

**Purpose:** Functions that take three parameters (curried as three nested functions)

**When:** Functions like `reduce` that need function, initial value, and array

**Structure:**

```typescript
//++ Reduces array to a single value using a reducer function
export default function reduce<T, U>(fn: (accumulator: U, item: T) => U) {
  return function reduceWithFunction(initialValue: U) {
    //++ [OVERLOAD] Array reducer: takes array, returns reduced value
    function reduceWithFunctionAndInitialValue(array: ReadonlyArray<T>): U

    //++ [OVERLOAD] Result reducer: takes and returns Result monad (fail fast)
    function reduceWithFunctionAndInitialValue(
      array: Result<ValidationError, ReadonlyArray<T>>,
    ): Result<ValidationError, U>

    //++ [OVERLOAD] Validation reducer: takes and returns Validation monad (accumulator)
    function reduceWithFunctionAndInitialValue(
      array: Validation<ValidationError, ReadonlyArray<T>>,
    ): Validation<ValidationError, U>

    //++ Implementation of the full curried function
    function reduceWithFunctionAndInitialValue(
      array:
        | ReadonlyArray<T>
        | Result<ValidationError, ReadonlyArray<T>>
        | Validation<ValidationError, ReadonlyArray<T>>,
    ): U | Result<ValidationError, U> | Validation<ValidationError, U> {
      // Use Toolsmith predicates for type narrowing
      if (isArray<T>(array)) {
        return _reduceArray(fn)(initialValue)(array)
      }

      if (isOk<ReadonlyArray<T>>(array)) {
        return chainResults(_reduceToResult(fn)(initialValue))(array)
      }

      if (isSuccess<ReadonlyArray<T>>(array)) {
        return chainValidations(_reduceToValidation(fn)(initialValue))(array)
      }

      // Fallback: pass through unchanged
      return array
    }

    return reduceWithFunctionAndInitialValue
  }
}
```

**Key Points:**
- Three levels of currying: `reduce(fn)(initialValue)(array)`
- Each level returns a function
- Monadic overloads still apply
- Follow same pattern as binary functions but with extra nesting

### Pattern 6: Delegating to Native Methods

**Purpose:** Implement Toolsmith function by delegating to native JavaScript method

**When:** Wrapping native array/string/object methods to provide semantic API

**Structure:**

```typescript
export default function _reduceArray<T, U>(
  fn: (accumulator: U, item: T) => U,
) {
  return function _reduceArrayWithFunction(initial: U) {
    return function _reduceArrayWithFunctionAndInitial(
      array: ReadonlyArray<T>,
    ): U {
      // Validate inputs using Toolsmith predicates
      if (and(isFunction(fn))(isArray<T>(array))) {
        //++ [EXCEPTION] Using native .reduce for performance
        //++ This is the ONLY place .reduce should be used
        //++ Everywhere else, use the `reduce` function instead
        return array.reduce(fn, initial)
      }

      // Fallback: return initial value unchanged
      return initial
    }
  }
}
```

**Key Points:**
- Validate inputs with Toolsmith predicates
- Delegate to native method with exception comment
- Provide fallback behavior for invalid inputs
- This pattern applies to: `.map`, `.filter`, `.reduce`, `.find`, `.some`, `.every`, etc.

### Pattern 7: Type Guards for Discriminated Unions

**Purpose:** Check discriminated union tag to narrow types

**When:** Creating type guards for Result/Validation/Either/Maybe monads

**Structure:**

```typescript
export default function isOk<T = unknown>(
  value: unknown,
): value is Ok<T> {
  //++ [EXCEPTION] Uses === operator and property access to check discriminated union tag
  //++ This is a primitive type guard operation with no higher-level abstraction available
  return isObject(value) && "_tag" in value && value._tag === "Ok"
}
```

**Key Points:**
- Check if value is object first (using Toolsmith `isObject`)
- Check if property exists with `in` operator
- Check tag value with `===`
- Return `value is Type` for type narrowing
- Enables exhaustive checking and type safety

**Common Tags:**
- Result: `"Ok"` | `"Error"`
- Validation: `"Success"` | `"Failure"`
- Either: `"Right"` | `"Left"`
- Maybe: `"Just"` | `"Nothing"`

### Pattern 8: Generator Functions (Special Case)

**Purpose:** Generators may use let/loops internally for performance

**When:** Creating lazy iterators or sequence generators

**Structure:**

```typescript
export default function* range(start: number) {
  return function* rangeFrom(end: number): Generator<number> {
    //++ [EXCEPTION] Using let and for loop in generator for performance
    //++ Generators are allowed to use imperative iteration internally
    //++ They produce immutable sequences externally
    for (let i = start; i <= end; i++) {
      yield i
    }
  }
}
```

**Key Points:**
- Generators are special case for constitutional rules
- Can use `let` and loops internally
- Must yield immutable values
- Must document exception
- External interface remains functional

## Using Toolsmith Functions Internally

**Important:** Even in Toolsmith library code, use Toolsmith predicates and functions strategically.

### When to Use Toolsmith Functions Internally

**YES - Use Toolsmith function when:**

1. **Type narrowing with predicates**
   ```typescript
   if (isArray<T>(value)) {
     // TypeScript knows value is ReadonlyArray<T>
   }
   ```

2. **Discriminated union narrowing**
   ```typescript
   if (isOk<T>(result)) {
     // TypeScript knows result is Ok<T>
   }
   ```

3. **Complex validation**
   ```typescript
   if (and(isFunction(fn))(isArray(array))) {
     // Both checks in one expression
   }
   ```

4. **Avoiding repetition (DRY)**
   ```typescript
   // ✅ Use Toolsmith function
   if (isEmpty(array)) {
     return defaultValue
   }

   // ❌ Don't repeat the logic
   if (Array.isArray(array) && array.length === 0) {
     return defaultValue
   }
   ```

5. **Need monadic behavior**
   ```typescript
   // Use Toolsmith map() for monadic behavior
   return chainResults(_mapToResult(f))(result)
   ```

### When to Use Raw Operators Internally

**YES - Use raw operator when:**

1. **Simple primitive operations**
   ```typescript
   return a === b
   return x > 0
   return value + 1
   ```

2. **Implementing the Toolsmith function itself**
   ```typescript
   // In not/index.ts
   return !value  // This IS the not() implementation
   ```

3. **Performance-critical paths**
   ```typescript
   return array.map(f)  // Native method is fastest
   ```

4. **Inside predicates**
   ```typescript
   return typeof value === "string"  // Type checking
   ```

5. **Property access for type narrowing**
   ```typescript
   return value._tag === "Ok"  // Discriminated union check
   ```

## Common Violations

### ❌ Never Forget Exception Comments

**Wrong:**
```typescript
export default function not(value: Value): boolean {
  return !value  // ❌ Missing exception comment!
}
```

**Correct:**
```typescript
export default function not(value: Value): boolean {
  //++ [EXCEPTION] This is the ONLY permitted use of the ! operator
  //++ Everywhere else, use this `not` function instead
  return !value
}
```

### ❌ Never Use Raw Operators in Consuming Code

**Wrong (in application using Toolsmith):**
```typescript
// ❌ These are all wrong in consuming code:
if (!value) { }                    // Use not(value)
if (array.length === 0) { }        // Use isEmpty(array)
if (a === b) { }                   // Use isEqual(a)(b)
if (condition1 && condition2) { }  // Use and(condition1)(condition2)
```

**Correct (in application):**
```typescript
// ✅ Use Toolsmith functions:
if (not(value)) { }
if (isEmpty(array)) { }
if (isEqual(a)(b)) { }
if (and(condition1)(condition2)) { }
```

### ❌ Never Skip Currying

**Wrong:**
```typescript
// ❌ Multiple parameters not allowed
export default function is(a: unknown, b: unknown): boolean {
  return Object.is(a, b)
}
```

**Correct:**
```typescript
// ✅ Curried properly
export default function is<T>(a: T) {
  return function isSameAs<U>(b: U): boolean {
    //++ [EXCEPTION] Using Object.is internally
    //++ External code uses this is() function instead
    return Object.is(a, b)
  }
}
```

**Exception:** Uncurried callbacks passed to native methods are acceptable:
```typescript
// ✅ Accept uncurried callback for .map
export default function map<T, U>(f: (arg: T, index?: number) => U) {
  // f is uncurried because native .map expects uncurried callback
  return function mapWithFunction(array: ReadonlyArray<T>) {
    return array.map(f)  // Native method expects (item, index) => result
  }
}
```

### ❌ Never Violate Still-Mandatory Rules

**These are STILL forbidden even in Toolsmith:**

```typescript
// ❌ WRONG - classes forbidden
class Validator {
  validate(value: unknown) { }
}

// ❌ WRONG - mutations forbidden
const result = []
array.forEach(item => result.push(item))

// ❌ WRONG - loops forbidden (except generators)
for (let i = 0; i < array.length; i++) {
  process(array[i])
}

// ❌ WRONG - arrow functions forbidden (except type sigs)
const add = (a: number, b: number) => a + b
```

### ❌ Never Confuse Internal vs External Rules

**Wrong thinking:**
- "If Toolsmith can use `===`, then consuming code can too" ❌
- "Exception comments are optional" ❌
- "I can use loops in Toolsmith helpers" ❌ (only generators)

**Correct thinking:**
- "Toolsmith CAN use `===` internally, consuming code MUST use `isEqual()`" ✅
- "Exception comments are mandatory for all violations" ✅
- "Only generators can use loops, with exception comments" ✅

## Implementation Checklist

When implementing a Toolsmith library function, verify ALL of these:

### 1. Structure
- [ ] Curried if multi-parameter (one parameter per function level)
- [ ] Named function declaration (not arrow function)
- [ ] One function per file (`index.ts`)
- [ ] Private helpers in `_subfolder` directories
- [ ] Follows file-system-organization skill patterns

### 2. Operators and Methods
- [ ] Raw operators documented with `//++ [EXCEPTION]` comment
- [ ] Exception comment explains what consuming code uses
- [ ] Native methods documented with exception comment
- [ ] Property access documented if violating abstraction

### 3. Monadic Behavior (if applicable)
- [ ] Overload signature for plain value
- [ ] Overload signature for Result monad (if applicable)
- [ ] Overload signature for Validation monad (if applicable)
- [ ] Implementation handles all cases with type guards
- [ ] Fallthrough behavior for errors (pass through unchanged)

### 4. Still Forbidden (Never Allowed)
- [ ] No classes anywhere
- [ ] No mutations anywhere (except IO boundaries with comment)
- [ ] No loops anywhere (except generators with comment)
- [ ] No arrow functions (except type signatures)
- [ ] No side effects (except IO boundaries with comment)

### 5. Documentation
- [ ] Envoy comments (`//++`) for function purpose
- [ ] Exception comments (`//++ [EXCEPTION]`) on all violations
- [ ] Clear explanation of what consuming code should use
- [ ] Overload comments (`//++ [OVERLOAD]`) for monadic functions
- [ ] Implementation comments for complex logic

### 6. Type Safety
- [ ] Proper TypeScript types for all parameters and returns
- [ ] Type predicates (`value is Type`) for type guards
- [ ] Generic types where appropriate
- [ ] Readonly for arrays and objects

### 7. Testing (Critical)
- [ ] Test file exists (`index.test.ts`)
- [ ] Tests for plain value path
- [ ] Tests for Result monad path (if applicable)
- [ ] Tests for Validation monad path (if applicable)
- [ ] Tests for edge cases and error conditions

## Examples

See `examples/` directory for complete implementations demonstrating all patterns:

**Predicates:**
- `predicates/isArray/index.ts` - Type guard using `Array.isArray()`
- `predicates/isEmpty/index.ts` - Boolean check using `.length === 0`

**Logic:**
- `logic/not/index.ts` - Using `!` operator (canonical exception example)
- `logic/and/index.ts` - Using `&&` operator (binary curried logic)

**Array/Map Pattern (Binary Curried with Monadic Overloads):**
- `array/map/index.ts` - Main function with Result/Validation/plain overloads
- `array/map/_mapArray/index.ts` - Delegates to native `.map()`
- `array/map/_mapToResult/index.ts` - Maps inside Result monad
- `array/map/_mapToValidation/index.ts` - Maps inside Validation monad

**Array/Reduce Pattern (Ternary Curried with Monadic Overloads):**
- `array/reduce/index.ts` - Main function with three-level currying
- `array/reduce/_reduceArray/index.ts` - Delegates to native `.reduce()`
- `array/reduce/_reduceToResult/index.ts` - Reduces inside Result monad
- `array/reduce/_reduceToValidation/index.ts` - Reduces inside Validation monad

**Type Guards:**
- `monads/result/isOk/index.ts` - Discriminated union guard using `._tag === "Ok"`

Each example demonstrates:
- Proper exception documentation
- Currying patterns (unary, binary, ternary)
- Monadic behavior (where applicable)
- Helper delegation
- Type narrowing with predicates

## Cross-References

### This Skill References

**Core Structure and Patterns:**
- **function-implementation** - Base structure, currying, parameter order, when to return Result vs plain values
- **file-system-organization** - Helper placement (`_helpers`), modularity, one function per file
- **naming** - Function and parameter naming conventions, conjunction selection

**Type and Predicate Patterns:**
- **sitebender-predicates** - Predicate-specific patterns, type guards, higher-order predicates
- **type-definition** - Type guards, branded types, discriminated unions, smart constructors
- **error-handling** - Result/Validation monad usage, error type design, error composition

**Additional Context:**
- **abbreviations** - For naming consistency (no abbreviations unless whitelisted)

### This Skill CONTRASTS With

**operator-substitutions** - Shows what consuming code MUST use
- **Key difference:** Toolsmith IMPLEMENTS these operator substitutes; it doesn't use them internally
- **Consuming code:** MUST use `not()`, `and()`, `isEqual()`, `isEmpty()` from operator-substitutions
- **Toolsmith internals:** CAN use `!`, `&&`, `===`, `.length` with exception documentation

### This Skill Is Referenced By

- Internal Toolsmith development documentation
- Advanced function implementation (when extending Toolsmith with new domains)
- **NOT by consuming code skills** (function-implementation, component, etc.)

### Clear Separation of Concerns

**Use function-implementation skill when:**
- Writing application code
- Implementing functions in other libraries (warden, steward, sentinel)
- Consuming Toolsmith functions
- Following strict constitutional rules

**Use toolsmith skill when:**
- Implementing functions FOR Toolsmith library itself
- Understanding internal implementation philosophy
- Writing predicates, array operations, monadic functions
- Need pragmatic performance optimizations

## Summary

### Key Takeaways

1. **The Pragmatic Boundary**
   - Toolsmith CAN use raw operators internally
   - Consuming code MUST use Toolsmith functions
   - The abstraction boundary is the public API, not the implementation

2. **Exception Documentation Is Mandatory**
   - Every raw operator must have `//++ [EXCEPTION]` comment
   - Explain why the exception is needed
   - Explain what consuming code should use instead

3. **Still-Mandatory Rules**
   - No classes, no mutations, no loops (except generators), no arrow functions
   - These apply everywhere in Toolsmith, always

4. **Monadic Behavior Pattern**
   - Overload signatures for plain/Result/Validation
   - Type guards narrow and dispatch to helpers
   - Fallthrough behavior for errors

5. **Use Toolsmith Functions Strategically**
   - Use predicates for type narrowing even internally
   - Use raw operators for simple operations
   - Balance readability, performance, and maintainability

6. **Predicates Have Special Status**
   - Can use raw operators freely (with documentation)
   - Return plain boolean (not wrapped in Result)
   - Used throughout Toolsmith for type narrowing

### The Philosophy

**Internal: Performance and Pragmatism**
- Use native operators and methods
- Optimize for speed and simplicity
- Document all exceptions

**External: Semantic and Safe**
- Provide semantic functions (`not`, `isEmpty`, `isEqual`)
- Monadic error handling (Result/Validation)
- Type-safe interfaces

**The Balance:**
- We implement the abstractions, we don't consume them
- Use pragmatic implementation to provide powerful API
- Exception documentation ensures maintainability

### When In Doubt

1. **Am I building Toolsmith or consuming it?**
   - Building → Use this toolsmith skill
   - Consuming → Use function-implementation skill

2. **Can I use this raw operator?**
   - Check if you're in Toolsmith library code (yes)
   - Check if it's still-forbidden (classes, mutations, loops) (no)
   - Document with `//++ [EXCEPTION]` comment (mandatory)

3. **Should I use Toolsmith function or raw operator?**
   - Type narrowing → Use Toolsmith predicate
   - Simple operation → Use raw operator (with comment)
   - Repetitive logic → Use Toolsmith function (DRY)
   - Need monadic behavior → Use Toolsmith function

**When in doubt: Document the exception and explain what consuming code should use instead.**
