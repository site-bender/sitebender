# Combinator - Curry & Application Functions

**Location**: `src/vanilla/combinator/`
**Functions**: 15
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### curry
- **Current**: `(fn: (...args: any[]) => any) => any`
- **Returns**: any (curried function)
- **Description**: Auto-curries a function to allow partial application, transforming it to accept arguments one at a time
- **Target**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => Result<CurryError, R>) => (...args: Partial<T>) => Result<CurryError, R> | ((...moreArgs: Partial<T>) => ...)`

### curryN (`curryByArity`?)
- **Current**: `<TFunction extends (...args: Value[]) => Value>(arity: number) => (targetFunction: TFunction) => (...args: Value[]) => Value`
- **Returns**: Value (curried function or final result)
- **Description**: Curries a function to exactly n arguments, limiting it to accept only the specified number of parameters
- **Target**: `(arity: number) => <T extends ReadonlyArray<unknown>, R>(targetFunction: (...args: T) => Result<CurryError, R>) => (...args: Partial<T>) => Result<CurryError, R> | ((...moreArgs: Partial<T>) => ...)`

### partial
- **Current**: `<T extends ReadonlyArray<any>, U extends ReadonlyArray<any>, R>(fn: (...args: [...T, ...U]) => R, ...fixedArgs: T) => (...remainingArgs: U) => R`
- **Returns**: R
- **Description**: Partially applies a function with fixed arguments, returning a new function that takes the remaining arguments
- **Target**: `<T extends ReadonlyArray<unknown>, U extends ReadonlyArray<unknown>, R>(fn: (...args: [...T, ...U]) => Result<PartialError, R>, ...fixedArgs: T) => (...remainingArgs: U) => Result<PartialError, R>`

### partialRight
- **Current**: `<T extends ReadonlyArray<unknown>, U extends ReadonlyArray<unknown>, R>(fn: (...args: [...T, ...U]) => R, ...fixedArgs: U) => (...initialArgs: T) => R`
- **Returns**: R
- **Description**: Like partial but fixes arguments from the right, returning a new function that takes the initial arguments
- **Target**: `<T extends ReadonlyArray<unknown>, U extends ReadonlyArray<unknown>, R>(fn: (...args: [...T, ...U]) => Result<PartialError, R>, ...fixedArgs: U) => (...initialArgs: T) => Result<PartialError, R>`

### arity
- **Current**: `<R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => (...args: ReadonlyArray<unknown>) => R`
- **Returns**: R
- **Description**: Wraps a function to report a specific arity, forcing it to accept exactly n arguments and ignoring extras
- **Target**: `<R>(n: number, fn: (...args: ReadonlyArray<unknown>) => Result<ArityError, R>) => (...args: ReadonlyArray<unknown>) => Result<ArityError, R>`

### unary
- **Current**: `<T, R>(fn: (arg: T, ...rest: ReadonlyArray<unknown>) => R) => (arg: T) => R`
- **Returns**: R
- **Description**: Wraps a function to accept exactly 1 argument (equivalent to arity(1, fn) but more semantic)
- **Target**: `<T, R>(fn: (arg: T, ...rest: ReadonlyArray<unknown>) => Result<ArityError, R>) => (arg: T) => Result<ArityError, R>`

### binary
- **Current**: `<A, B, R>(fn: (a: A, b: B, ...rest: ReadonlyArray<unknown>) => R) => (a: A, b: B) => R`
- **Returns**: R
- **Description**: Wraps a function to accept exactly 2 arguments (equivalent to arity(2, fn) but more semantic)
- **Target**: `<A, B, R>(fn: (a: A, b: B, ...rest: ReadonlyArray<unknown>) => Result<ArityError, R>) => (a: A, b: B) => Result<ArityError, R>`

### nAry
- **Current**: `<R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => (...args: ReadonlyArray<unknown>) => R`
- **Returns**: R
- **Description**: Creates a function that accepts exactly n arguments (alias for arity with different naming convention)
- **Target**: `<R>(n: number, fn: (...args: ReadonlyArray<unknown>) => Result<ArityError, R>) => (...args: ReadonlyArray<unknown>) => Result<ArityError, R>`

### flip
- **Current**: `<A, B, Rest extends ReadonlyArray<unknown>, R>(fn: (a: A, b: B, ...rest: Rest) => R) => (b: B, a: A, ...rest: Rest) => R`
- **Returns**: R
- **Description**: Flips the first two arguments of a function, useful for creating variations with reversed parameter order
- **Target**: `<A, B, Rest extends ReadonlyArray<unknown>, R>(fn: (a: A, b: B, ...rest: Rest) => Result<FlipError, R>) => (b: B, a: A, ...rest: Rest) => Result<FlipError, R>`

### bind
- **Current**: `<T, Args extends ReadonlyArray<unknown>, R>(fn: (this: T, ...args: Args) => R, context: T) => (...args: Args) => R`
- **Returns**: R
- **Description**: Creates a function bound to a specific context (this) - functional wrapper around Function.prototype.bind for method binding
- **Target**: `<T, Args extends ReadonlyArray<unknown>, R>(fn: (this: T, ...args: Args) => Result<BindError, R>, context: T) => (...args: Args) => Result<BindError, R>`

### call
- **Current**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => R, ...args: T) => R`
- **Returns**: R
- **Description**: Calls a function with individual arguments - functional wrapper for immediate function invocation
- **Target**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => Result<CallError, R>, ...args: T) => Result<CallError, R>`

### apply
- **Current**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => R, args: T) => R`
- **Returns**: R
- **Description**: Calls a function with an array of arguments, spreading array elements as individual arguments
- **Target**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => Result<ApplyError, R>, args: T) => Result<ApplyError, R>`

### construct
- **Current**: `<T extends ReadonlyArray<unknown>, R>(Constructor: new (...args: T) => R) => (...args: T) => R`
- **Returns**: R
- **Description**: Wraps a constructor function for use without 'new', converting a class constructor into a regular function
- **Target**: `<T extends ReadonlyArray<unknown>, R>(Constructor: new (...args: T) => R) => (...args: T) => Result<ConstructError, R>`

### constructN (`constructByArity`?)
- **Current**: `<R>(n: number, Constructor: new (...args: unknown[]) => R) => (...args: unknown[]) => R`
- **Returns**: R
- **Description**: Like construct but with specified arity, limiting constructor arguments to exactly n parameters
- **Target**: `<R>(n: number, Constructor: new (...args: unknown[]) => R) => (...args: unknown[]) => Result<ConstructError, R>`

### wrap
- **Current**: `<T extends ReadonlyArray<any>, R>(fn: (...args: T) => R, wrapper: (fn: (...args: T) => R, ...args: T) => R) => (...args: T) => R`
- **Returns**: R
- **Description**: Wraps a function with a wrapper function, where the wrapper receives the original function as its first argument
- **Target**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => Result<WrapError, R>, wrapper: (fn: (...args: T) => Result<WrapError, R>, ...args: T) => Result<WrapError, R>) => (...args: T) => Result<WrapError, R>`

### thunkify
- **Current**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => R, ...args: T) => () => R`
- **Returns**: () => R (thunk)
- **Description**: Converts a function to a thunk (zero-argument function), delaying execution by wrapping in a parameterless function
- **Target**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => Result<ThunkError, R>, ...args: T) => () => Result<ThunkError, R>`

---

## Migration Notes

Curry and application functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when operation succeeds
2. Return `error(CurryError | PartialError | ArityError | etc.)` when operation fails, with descriptive error messages
3. Maintain currying behavior for all functions
4. Preserve function transformation semantics
5. Handle errors from wrapped functions
6. Support proper type inference for curried functions

## Special Considerations

### Currying Functions

#### curry
- Auto-detects function arity using `fn.length`
- Returns curried function or final result based on accumulated arguments
- Uses recursive function to build up arguments
- Should validate function is provided and has valid arity
- Current implementation uses `any` types - needs proper typing

#### curryN
- Explicitly specifies arity instead of auto-detecting
- More flexible than `curry` for variadic functions
- Uses custom arity checking with `gte` from validation
- Already uses named functions (better than `curry`)
- Should validate arity is non-negative integer

### Partial Application

#### partial
- Fixes arguments from the left (beginning)
- Returns function accepting remaining arguments
- Uses spread operator to combine fixed and remaining args
- Should validate fixed arguments match function signature

#### partialRight
- Fixes arguments from the right (end)
- Useful when you want to fix later parameters
- Common use: fixing callback parameter in async functions
- Should validate fixed arguments match function signature

### Arity Control

#### arity / nAry
- Both do the same thing with different naming
- `arity` is more standard FP terminology
- `nAry` follows naming pattern of `unary`, `binary`
- Pre-built wrappers for arities 0-5 for performance
- Generic wrapper for arity > 5 using `slice`
- Should validate `n` is non-negative integer
- Should consider consolidating into single function with alias

#### unary
- Specialized version of `arity(1, fn)`
- More semantic and type-safe than generic arity
- Common use: `array.map(unary(parseInt))` to avoid index parameter
- Should validate function accepts at least one parameter

#### binary
- Specialized version of `arity(2, fn)`
- More semantic and type-safe than generic arity
- Useful for ensuring exactly two parameters
- Should validate function accepts at least two parameters

### Argument Transformation

#### flip
- Only flips first two arguments, rest remain in order
- Useful for adapting functions to different parameter orders
- Common use: creating `divideBy` from `divide`
- Should validate function accepts at least two parameters

### Context Binding

#### bind
- Functional wrapper around `Function.prototype.bind`
- Binds `this` context without partial application
- Uses `.apply()` to invoke with bound context
- Should validate context matches expected type
- Note: In FP, context binding is often an anti-pattern (prefer pure functions)

### Immediate Invocation

#### call
- Immediately invokes function with provided arguments
- Functional style: `call(fn, a, b)` instead of `fn(a, b)`
- Useful in higher-order contexts where function is data
- Essentially identity operation for function invocation

#### apply
- Like `call` but takes arguments as array
- Functional style: `apply(fn, [a, b])` instead of `fn(...[a, b])`
- Useful when arguments are already in array form
- Standard FP operation for working with argument lists

### Constructor Wrapping

#### construct
- Removes need for `new` keyword
- Makes constructors first-class functions
- Useful for mapping over arrays of constructor arguments
- Example: `map(construct(Date))([timestamp1, timestamp2])`
- Should validate Constructor is a valid constructor function

#### constructN
- Like `construct` but with arity control
- Limits constructor to exactly `n` arguments
- Uses same pattern as `arity`/`nAry` with pre-built wrappers
- Should validate `n` is non-negative integer

### Function Wrapping

#### wrap
- Passes original function to wrapper as first argument
- Allows wrapper to control invocation
- Useful for adding behavior (logging, timing, memoization)
- Wrapper receives both function and arguments
- Should validate wrapper is a function

#### thunkify
- Delays function execution by wrapping in zero-arg function
- Pre-applies arguments but doesn't execute
- Useful for lazy evaluation
- Common pattern: `const later = thunkify(expensiveFunc, arg1, arg2)`
- Result is callable: `later()` executes the function

---

## Implementation Dependencies

### Validation Dependencies
- **curryN** depends on `length`, `slice`, `gte` from array/validation
- **debounce** and **throttle** (in utilities) depend on `isNotUndefined`, `isUndefined`
- Other curry functions are self-contained

### Array Operation Dependencies
- **curryN** uses `slice` for argument slicing
- Most functions use spread operator for argument manipulation

### Helper Function Dependencies
- **arity** and **nAry** have identical pre-built wrapper objects (potential for sharing)
- **constructN** has same wrapper pattern as **arity**/**nAry**

### Refactoring Requirements

Functions using arrow syntax that need conversion to named functions:
- **unary** (arrow function)
- **binary** (arrow function)
- **partialRight** (arrow function)

Functions with imperative constructs:
- **curry** uses named inner function `curried` - acceptable pattern
- **arity**, **nAry**, **constructN** use object literals for wrappers - acceptable pattern

---

## Notes

### Function Arity Terminology

- **Nullary**: 0 arguments
- **Unary**: 1 argument
- **Binary**: 2 arguments
- **Ternary**: 3 arguments
- **Quaternary**: 4 arguments
- **Quinary**: 5 arguments
- **N-ary**: n arguments (variable)

### Currying vs Partial Application

Important distinction:
- **Currying**: Transform `f(a, b, c)` into `f(a)(b)(c)` - always one argument at a time
- **Partial Application**: Transform `f(a, b, c)` into `g(c)` where `g(c) = f(1, 2, c)` - fix some args

This library:
- **curry** and **curryN** support both patterns (can pass multiple args)
- **partial** and **partialRight** are pure partial application
- This flexibility is practical but technically "auto-currying" not "currying"

### Performance Considerations

#### Currying Overhead
- Curried functions create intermediate closures
- Each partial application creates new function
- For hot paths, consider direct calls instead of currying
- Pre-curry functions once, reuse the curried version

#### Arity Wrapper Optimization
- **arity**, **nAry**, **constructN** pre-build wrappers for common arities (0-5)
- Avoids `slice` overhead for common cases
- Generic fallback for arity > 5
- Consider extending pre-built range if profiling shows benefit

#### Thunk Creation
- **thunkify** creates closures over arguments
- Minimal overhead but accumulates if creating many thunks
- Good for delayed execution, bad for synchronous loops

### Common Use Cases

#### curry / curryN
- Creating configurable functions: `const add5 = curry(add)(5)`
- Point-free style programming
- Building function pipelines with partial configuration

#### partial / partialRight
- Pre-configuring API calls: `const getUser = partial(apiCall, 'GET', '/users')`
- Fixing callback parameters: `partialRight(addEventListener, handler)`
- Creating specialized versions of general functions

#### unary / binary
- Preventing extra arguments: `['1','2','3'].map(unary(parseInt))`
- Ensuring exact arity for callbacks
- Type safety for function parameters

#### flip
- Adapting parameter order: `const divideBy = flip(divide)`
- Creating variations of functions
- Working with point-free style

#### construct
- Mapping constructors: `map(construct(Date))([t1, t2, t3])`
- Using constructors as first-class functions
- Avoiding `new` keyword in functional code

#### thunkify
- Lazy evaluation: `const later = thunkify(expensive, args)`
- Building computation graphs
- Delaying side effects

### Testing Considerations

When migrating, ensure comprehensive tests for:
- Currying with different numbers of arguments
- Partial application at different positions
- Arity control with edge cases (0, 1, very large)
- Flipping functions with various signatures
- Context binding with `this`-dependent methods
- Constructor wrapping with various constructors
- Thunk execution and re-execution behavior
- Wrapper function receiving correct arguments
- Type safety across all transformations
