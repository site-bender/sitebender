# Combinator - Composition Functions

**Location**: `src/vanilla/combinator/`
**Functions**: 20
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### compose
- **Current**: `<T>(fns: ReadonlyArray<(value: any) => any>) => (input: T) => any`
- **Returns**: any
- **Description**: Functional programming compose utility that composes functions right-to-left (mathematical composition)
- **Target**: `<T>(fns: ReadonlyArray<(value: any) => any>) => (input: T) => Result<CompositionError, any>`

### pipe
- **Current**: `<T>(fns: ReadonlyArray<(value: any) => any>) => (input: T) => any`
- **Returns**: any
- **Description**: Functional programming pipe utility that composes functions left-to-right (data flows through the pipeline)
- **Target**: `<T>(fns: ReadonlyArray<(value: any) => any>) => (input: T) => Result<CompositionError, any>`

### composeAsync
- **Current**: `<T, R>(fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>>) => (input: T) => Promise<R>`
- **Returns**: Promise<R>
- **Description**: Asynchronous function composition utility that composes async functions right-to-left (mathematical composition)
- **Target**: `<T, R>(fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>>) => (input: T) => Promise<Result<CompositionError, R>>`

### pipeAsync
- **Current**: `<T, R>(fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>>) => (input: T) => Promise<R>`
- **Returns**: Promise<R>
- **Description**: Async version of pipe for Promise-returning functions, composing async functions left-to-right with automatic promise handling
- **Target**: `<T, R>(fns: ReadonlyArray<(value: unknown) => unknown | Promise<unknown>>) => (input: T) => Promise<Result<CompositionError, R>>`

### pipeWith
- **Current**: `<T, R>(composer: (fn: (value: unknown) => unknown, value: unknown) => unknown, fns: ReadonlyArray<(value: unknown) => unknown>) => (input: T) => R`
- **Returns**: R
- **Description**: Like pipe but uses a custom composition function, allowing custom logic for combining function results
- **Target**: `<T, R>(composer: (fn: (value: unknown) => unknown, value: unknown) => Result<CompositionError, unknown>, fns: ReadonlyArray<(value: unknown) => unknown>) => (input: T) => Result<CompositionError, R>`

### converge
- **Current**: `<T extends ReadonlyArray<unknown>, R>(converger: (...results: ReadonlyArray<unknown>) => R, branches: ReadonlyArray<(...args: T) => unknown>) => (...args: T) => R`
- **Returns**: R
- **Description**: Applies multiple functions to the same arguments and combines results - the converging function receives the results of all branch functions
- **Target**: `<T extends ReadonlyArray<unknown>, R>(converger: (...results: ReadonlyArray<unknown>) => Result<ConvergenceError, R>, branches: ReadonlyArray<(...args: T) => unknown>) => (...args: T) => Result<ConvergenceError, R>`

### juxt
- **Current**: `<T extends ReadonlyArray<unknown>, R>(fns: ReadonlyArray<(...args: T) => R>) => (...args: T) => Array<R>`
- **Returns**: Array<R>
- **Description**: Applies an array of functions to a value and returns array of results - each function receives the same arguments and results are collected
- **Target**: `<T extends ReadonlyArray<unknown>, R>(fns: ReadonlyArray<(...args: T) => R>) => (...args: T) => Result<JuxtError, Array<R>>`

### useWith
- **Current**: `<R>(fn: (...args: ReadonlyArray<unknown>) => R, transformers: ReadonlyArray<(arg: unknown) => unknown>) => (...args: ReadonlyArray<unknown>) => R`
- **Returns**: R
- **Description**: Transforms arguments before passing to a function, applying transformer functions to corresponding arguments
- **Target**: `<R>(fn: (...args: ReadonlyArray<unknown>) => Result<TransformError, R>, transformers: ReadonlyArray<(arg: unknown) => unknown>) => (...args: ReadonlyArray<unknown>) => Result<TransformError, R>`

### lift
- **Current**: `<R>(fn: (...args: ReadonlyArray<unknown>) => R) => (...arrays: ReadonlyArray<ReadonlyArray<unknown>>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Lifts a function to work with functors/applicatives, transforming it to work with wrapped values (Arrays, Promises, etc.)
- **Target**: `<R>(fn: (...args: ReadonlyArray<unknown>) => Result<LiftError, R>) => (...arrays: ReadonlyArray<ReadonlyArray<unknown>>) => Result<LiftError, Array<R>>`

### liftA2 (`liftBinary`?)
- **Current**: `<A, B, R>(fn: (a: A, b: B) => R) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Lifts a binary function to work with applicative functors, applying it to all combinations of elements from both arrays (Cartesian product)
- **Target**: `<A, B, R>(fn: (a: A, b: B) => Result<LiftError, R>) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => Result<LiftError, Array<R>>`

### liftA3 (`liftTernary`?)
- **Current**: `<A, B, C, R>(fn: (a: A, b: B, c: C) => R) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => (fc: ReadonlyArray<C>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Lifts a ternary function to work with applicative functors, applying it to all combinations of elements from three arrays (Cartesian product)
- **Target**: `<A, B, C, R>(fn: (a: A, b: B, c: C) => Result<LiftError, R>) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => (fc: ReadonlyArray<C>) => Result<LiftError, Array<R>>`

### liftA4 (`liftQuaternary`?)
- **Current**: `<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => R) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => (fc: ReadonlyArray<C>) => (fd: ReadonlyArray<D>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Lifts a quaternary function to work with applicative functors, applying it to all combinations of elements from four arrays (Cartesian product)
- **Target**: `<A, B, C, D, R>(fn: (a: A, b: B, c: C, d: D) => Result<LiftError, R>) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => (fc: ReadonlyArray<C>) => (fd: ReadonlyArray<D>) => Result<LiftError, Array<R>>`

### liftA5 (`liftQuinary`?)
- **Current**: `<A, B, C, D, E, R>(fn: (a: A, b: B, c: C, d: D, e: E) => R) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => (fc: ReadonlyArray<C>) => (fd: ReadonlyArray<D>) => (fe: ReadonlyArray<E>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Lifts a 5-ary function to work with applicative functors, applying it to all combinations of elements from five arrays (Cartesian product)
- **Target**: `<A, B, C, D, E, R>(fn: (a: A, b: B, c: C, d: D, e: E) => Result<LiftError, R>) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => (fc: ReadonlyArray<C>) => (fd: ReadonlyArray<D>) => (fe: ReadonlyArray<E>) => Result<LiftError, Array<R>>`

### liftUnary
- **Current**: `<A, R>(fn: (a: A) => R) => (fa: ReadonlyArray<A>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Lifts a unary function to work with functors (standard map operation), applying the function to each element in an array
- **Target**: `<A, R>(fn: (a: A) => Result<LiftError, R>) => (fa: ReadonlyArray<A>) => Result<LiftError, Array<R>>`

### liftBinary
- **Current**: `<A, B, R>(fn: (a: A, b: B) => R) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Lifts a binary function to work with functors pairwise (zipWith behavior), applying the function to corresponding elements at the same index
- **Target**: `<A, B, R>(fn: (a: A, b: B) => Result<LiftError, R>) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => Result<LiftError, Array<R>>`

### liftTernary
- **Current**: `<A, B, C, R>(fn: (a: A, b: B, c: C) => R) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => (fc: ReadonlyArray<C>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Lifts a ternary function to work with functors element-wise (zipWith for three arrays), applying the function to corresponding elements at the same index
- **Target**: `<A, B, C, R>(fn: (a: A, b: B, c: C) => Result<LiftError, R>) => (fa: ReadonlyArray<A>) => (fb: ReadonlyArray<B>) => (fc: ReadonlyArray<C>) => Result<LiftError, Array<R>>`

### liftN (`liftByArity`?)
- **Current**: `<R>(n: number, fn: (...args: ReadonlyArray<unknown>) => R) => (...arrays: ReadonlyArray<ReadonlyArray<unknown>>) => Array<R>`
- **Returns**: Array<R>
- **Description**: Like lift but with specified arity, lifting a function to work with exactly n wrapped values
- **Target**: `<R>(n: number, fn: (...args: ReadonlyArray<unknown>) => Result<LiftError, R>) => (...arrays: ReadonlyArray<ReadonlyArray<unknown>>) => Result<LiftError, Array<R>>`

### when
- **Current**: `<T>(predicate: (value: T) => boolean, fn: (value: T) => T) => (value: T) => T`
- **Returns**: T
- **Description**: Conditionally applies a function based on a predicate, returning the value unchanged if predicate is false
- **Target**: `<T>(predicate: (value: T) => boolean, fn: (value: T) => Result<ConditionalError, T>) => (value: T) => Result<ConditionalError, T>`

### unless
- **Current**: `<T>(predicate: (value: T) => boolean, fn: (value: T) => T) => (value: T) => T`
- **Returns**: T
- **Description**: The opposite of when - applies function when predicate is false, returning the value unchanged if predicate is true
- **Target**: `<T>(predicate: (value: T) => boolean, fn: (value: T) => Result<ConditionalError, T>) => (value: T) => Result<ConditionalError, T>`

### until
- **Current**: `<T>(predicate: (value: T) => boolean, fn: (value: T) => T, initial: T) => T`
- **Returns**: T
- **Description**: Calls a function repeatedly until a predicate returns true, applying the function to its own output until the condition is met
- **Target**: `<T>(predicate: (value: T) => boolean, fn: (value: T) => Result<RecursionError, T>, initial: T) => Result<RecursionError, T>`

---

## Migration Notes

Composition functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when composition succeeds
2. Return `error(CompositionError)` when composition fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve function composition semantics
5. Handle errors at each step in the composition chain
6. Support both synchronous and asynchronous compositions

## Special Considerations

### Function Composition Patterns

#### Synchronous Composition
- **compose** and **pipe** differ only in order (right-to-left vs left-to-right)
- Both use `reduce`/`reduceRight` to chain function calls
- Should handle errors at any step in the chain
- Current implementations return `any` - should be properly typed in monadic form

#### Asynchronous Composition
- **composeAsync** and **pipeAsync** handle Promise-returning functions
- Use `Promise.then` to chain asynchronous operations
- Should wrap Promise rejections in Result errors
- Currently return `Promise<R>` - should return `Promise<Result<E, R>>`

#### Custom Composition
- **pipeWith** allows custom composition logic via `composer` parameter
- The composer controls how values flow between functions
- Should validate that composer function is provided and valid

### Lifting Functions

#### Applicative Lifting (Cartesian Product)
- **lift**, **liftA2**, **liftA3**, **liftA4**, **liftA5** create Cartesian products
- Apply function to all combinations of elements from input arrays
- Can produce very large result arrays (product of input array lengths)
- Should validate input arrays are non-empty

#### Functor Lifting (Pairwise/ZipWith)
- **liftUnary**, **liftBinary**, **liftTernary** apply pairwise
- Result length is minimum of input array lengths
- Simpler and more predictable than applicative lifting
- Should handle empty arrays gracefully

#### Parametric Lifting
- **liftN** allows specifying arity explicitly
- Takes first `n` arrays and ignores extras
- Returns empty array if insufficient arrays provided
- Should validate `n` is non-negative

### Branching Combinators

#### converge
- Applies multiple "branch" functions to same arguments
- Passes all branch results to a "converger" function
- Useful for computing multiple values and combining them
- Should handle errors from any branch function

#### juxt
- Similar to converge but returns array of results directly
- No combining/converging step
- Simpler than converge when you just want all results
- Should collect errors from all functions

### Argument Transformation

#### useWith
- Applies transformer functions to corresponding arguments
- Transformers array can be shorter than arguments (remaining args pass through)
- Should handle missing transformers gracefully
- Should validate transformer functions are provided

### Conditional Execution

#### when/unless
- Apply function only when predicate is true/false
- Always return same type as input
- Useful in pipelines for conditional transformations
- Should validate predicate returns boolean

#### until
- Recursive function that loops until predicate is true
- Risk of infinite recursion if predicate never becomes true
- Should add maximum iteration count for safety
- Should handle stack overflow gracefully

---

## Implementation Dependencies

### Validation Dependencies
- Most composition functions work with generic types
- **lift** variants depend on array operations
- **when**, **unless**, **until** depend on boolean predicates

### Array Operation Dependencies
- **compose** uses `reduceRight`
- **pipe** uses `reduce`
- **liftA2-A5** use `flatMap` and `map` for Cartesian products
- **liftBinary**, **liftTernary** use `Array.from` for pairwise operations
- **juxt** uses `map` to collect results

### Helper Function Dependencies
- **lift** has complex Cartesian product logic using `reduce` and `flatMap`
- **liftN** has similar logic but parameterized by arity

### Refactoring Requirements

Functions using arrow syntax that need conversion to named functions:
- None - all composition functions already use named function declarations

Functions with complex imperative logic:
- **lift** uses `reduce` with `flatMap` - already functional
- **liftN** uses `reduce` with `flatMap` - already functional
- **until** uses recursion - already functional but needs safety limits

---

## Notes

### Composition Function Families

#### Basic Composition
- **compose**: f(g(x)) - right-to-left
- **pipe**: g(f(x)) - left-to-right
- **composeAsync**: async f(async g(x))
- **pipeAsync**: async g(async f(x))
- **pipeWith**: custom composition logic

#### Lifting Functions
Two distinct lifting strategies:
1. **Applicative** (Cartesian): liftA2, liftA3, liftA4, liftA5, lift, liftN
2. **Functor** (Pairwise): liftUnary, liftBinary, liftTernary

#### Branching
- **converge**: Apply multiple functions, combine results
- **juxt**: Apply multiple functions, collect results

#### Conditional
- **when**: Apply if true
- **unless**: Apply if false
- **until**: Loop until true

### Performance Considerations

#### Cartesian Product Explosion
Applicative lifting functions can create very large result arrays:
- `liftA2` on `[1,2,3]` and `[4,5,6]` produces 9 results
- `liftA5` on five 10-element arrays produces 100,000 results
- Should document this behavior and warn about large inputs

#### Recursion Limits
- **until** uses tail recursion but JavaScript doesn't optimize it
- Risk of stack overflow on deeply recursive calls
- Should add iteration limit or convert to trampolined version

#### Memoization Opportunities
- Composition functions could benefit from memoization
- **compose** and **pipe** with same functions could be cached
- Lifting functions with pure inputs could be memoized

### Testing Considerations

When migrating, ensure comprehensive tests for:
- Empty function arrays (compose, pipe, etc.)
- Single function arrays
- Error propagation through composition chains
- Promise rejection handling (async compositions)
- Empty arrays in lifting functions
- Mismatched array lengths in pairwise lifting
- Large Cartesian products in applicative lifting
- Infinite recursion prevention (until)
- Predicate returning non-boolean (when, unless)
