# Combinator - Utility Functions

**Location**: `src/vanilla/combinator/`
**Functions**: 14
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### tap

- **Current**: `<T>(fn: (value: T) => unknown) => (value: T) => T`
- **Returns**: T
- **Description**: Runs a side effect function on a value and returns the value, useful for debugging, logging, or performing side effects in a pipeline
- **Target**: `<T>(fn: (value: T) => unknown) => (value: T) => Result<TapError, T>`

### memoize

- **Current**: `<T extends ReadonlyArray<any>, R>(fn: (...args: T) => R) => ((...args: T) => R) & { clear: () => void }`
- **Returns**: R (memoized function with clear method)
- **Description**: Returns a memoized version of a function that caches results using JSON.stringify for cache key generation by default
- **Target**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => Result<MemoizeError, R>) => ((...args: T) => Result<MemoizeError, R>) & { clear: () => void }`

### memoizeWith

- **Current**: `<T extends ReadonlyArray<any>, R>(keyGen: (...args: T) => string, fn: (...args: T) => R) => ((...args: T) => R) & { clear: () => void }`
- **Returns**: R (memoized function with clear method)
- **Description**: Like memoize but uses a custom cache key generator, allowing control over how arguments are converted to cache keys
- **Target**: `<T extends ReadonlyArray<unknown>, R>(keyGen: (...args: T) => string, fn: (...args: T) => Result<MemoizeError, R>) => ((...args: T) => Result<MemoizeError, R>) & { clear: () => void }`

### memoizeKey

- **Current**: `(options?: KeyOptions) => (...args: Array<unknown>) => string`
- **Returns**: string (cache key)
- **Description**: Creates consistent cache keys for memoization, generating deterministic string keys from various input types with circular reference handling
- **KeyOptions**: `{ separator?: string, maxDepth?: number, includeType?: boolean, maxLength?: number, hash?: boolean, transform?: (arg: unknown) => unknown }`
- **Target**: `(options?: KeyOptions) => (...args: Array<unknown>) => Result<MemoizeKeyError, string>`

### debounce

- **Current**: `<T extends ReadonlyArray<unknown>, R>(wait: number, fn: (...args: T) => R) => ((...args: T) => void) & { cancel: () => void }`
- **Returns**: void (debounced function with cancel method)
- **Description**: Returns a debounced version of a function that delays invoking until after wait milliseconds have elapsed since the last call
- **Target**: `<T extends ReadonlyArray<unknown>, R>(wait: number, fn: (...args: T) => Result<DebounceError, R>) => ((...args: T) => void) & { cancel: () => void }`

### throttle

- **Current**: `<T extends ReadonlyArray<unknown>, R>(wait: number, fn: (...args: T) => R) => ((...args: T) => R | void) & { cancel: () => void }`
- **Returns**: R | void (throttled function with cancel method)
- **Description**: Returns a throttled version of a function that only invokes at most once per wait milliseconds
- **Target**: `<T extends ReadonlyArray<unknown>, R>(wait: number, fn: (...args: T) => Result<ThrottleError, R>) => ((...args: T) => Result<ThrottleError, R> | void) & { cancel: () => void }`

### once

- **Current**: `<T extends ReadonlyArray<any>, R>(fn: (...args: T) => R) => ((...args: T) => R) & { reset: () => void }`
- **Returns**: R (function that runs once, with reset method)
- **Description**: Ensures a function can only be called once, with subsequent calls returning the result of the first invocation
- **Target**: `<T extends ReadonlyArray<unknown>, R>(fn: (...args: T) => Result<OnceError, R>) => ((...args: T) => Result<OnceError, R>) & { reset: () => void }`

### tryCatch

- **Current**: `<T extends ReadonlyArray<any>, R, E>(tryFn: (...args: T) => R, catchFn: (error: unknown, ...args: T) => E) => (...args: T) => R | E`
- **Returns**: R | E
- **Description**: Wraps a function to catch errors and call an error handler, providing a functional way to handle exceptions
- **Target**: `<T extends ReadonlyArray<unknown>, R>(tryFn: (...args: T) => R, catchFn: (error: unknown, ...args: T) => Result<TryCatchError, R>) => (...args: T) => Result<TryCatchError, R>`

### complement

- **Current**: `<T extends ReadonlyArray<unknown>>(predicate: (...args: T) => boolean) => (...args: T) => boolean`
- **Returns**: boolean
- **Description**: Returns the logical complement of a predicate function, creating a function that returns the opposite boolean result
- **Target**: `<T extends ReadonlyArray<unknown>>(predicate: (...args: T) => boolean) => (...args: T) => boolean` (no change - predicates remain boolean)

### constant

- **Current**: `<T>(value: T) => (..._args: ReadonlyArray<unknown>) => T`
- **Returns**: T
- **Description**: Returns a function that always returns the given value, ignoring all arguments
- **Target**: `<T>(value: T) => (..._args: ReadonlyArray<unknown>) => T` (no change - always succeeds)

### identity

- **Current**: `<T>(a: T) => T`
- **Returns**: T
- **Description**: Identity function that returns its argument unchanged
- **Target**: `<T>(a: T) => T` (no change - always succeeds)

### nthArg (should be `nthArgument`, maybe aliased)

- **Current**: `(n: number) => (...args: ReadonlyArray<unknown>) => unknown`
- **Returns**: unknown
- **Description**: Returns a function that returns its nth argument, useful for selecting specific arguments in functional pipelines
- **Target**: `(n: number) => (...args: ReadonlyArray<unknown>) => Result<NthArgError, unknown>`

### of

- **Current**: `<T>(value: T) => Array<T>`
- **Returns**: Array<T>
- **Description**: Wraps a value in an array (singleton), creating a single-element array containing the value
- **Target**: `<T>(value: T) => Array<T>` (no change - always succeeds)

---

## Migration Notes

Utility functions will be converted to Result-returning functions where appropriate. The monadic versions will:

1. Return `ok(value)` when operation succeeds
2. Return `error(UtilityError)` when operation fails, with descriptive error messages
3. Maintain utility semantics for each function
4. Preserve side-effect behavior for functions like tap, debounce, throttle
5. Handle edge cases gracefully (invalid arguments, out-of-bounds access, etc.)
6. Keep pure utility functions (identity, constant, of, complement) unchanged as they cannot fail

## Special Considerations

### Side Effects & Pipeline Utilities

#### tap

- Runs side effect function but returns original value unchanged
- Allows inserting logging, debugging, or other side effects in pipelines
- Side effect function return value is ignored
- Common use: `pipe([transform1, tap(console.log), transform2])`
- Should mark as `[IO]` function when side effect is impure
- Should validate that function is provided

### Memoization

#### memoize

- Uses `JSON.stringify` to generate cache keys from arguments
- Cache stored in `Map` for O(1) lookup
- Includes `.clear()` method to reset cache
- Works for any JSON-serializable arguments
- Fails for circular references, functions, symbols
- Should validate function is pure (document requirement)
- Should handle JSON.stringify failures gracefully

#### memoizeWith

- Like `memoize` but accepts custom key generator
- Key generator must return string for Map key
- More flexible than default JSON.stringify approach
- Allows handling non-JSON-serializable types
- Common use: `memoizeWith(args => args[0].id, fetchUser)`
- Should validate key generator returns string
- Should handle key generator failures

#### memoizeKey

- Complex utility for generating consistent cache keys
- Handles many edge cases: primitives, objects, arrays, Sets, Maps, Dates, RegExp
- Circular reference detection using WeakSet
- Depth limiting to prevent infinite recursion
- Optional type information in keys
- Optional hashing for long keys
- Transform function for pre-processing values
- Uses `let` and imperative logic (acceptable for complexity)
- Should validate options are valid
- Should handle edge cases in circular reference tracking

### Timing & Rate Limiting

#### debounce

- Delays execution until `wait` ms after last call
- Each new call resets the timer
- Common use: search-as-you-type, window resize handlers
- Includes `.cancel()` method to abort pending call
- Uses `setTimeout` - inherently impure/IO
- Should mark as `[IO]` function
- Should validate wait time is non-negative
- Should handle timer cleanup on cancel

#### throttle

- Ensures function executes at most once per `wait` ms
- First call executes immediately
- Subsequent calls within wait period are queued
- Only last queued call executes after wait period
- More complex than debounce - tracks last call time
- Includes `.cancel()` method to abort pending call
- Uses `setTimeout` and `Date.now()` - inherently impure/IO
- Should mark as `[IO]` function
- Should validate wait time is non-negative
- Should handle timer cleanup on cancel

#### once

- Function executes on first call, result is cached
- Subsequent calls return cached result immediately
- Includes `.reset()` method to allow re-execution
- Common use: initialization functions, singleton creation
- Should validate function is provided
- Should handle case where function throws on first call
- Reset functionality useful for testing

### Error Handling

#### tryCatch

- Wraps function in try-catch block
- Calls catch handler with error and original arguments
- Catch handler can transform error into recovery value
- Common pattern for working with throwing code
- Should document that this enables exceptions (anti-pattern in FP)
- Better approach: convert throwing functions to Result-returning
- Consider deprecating in favor of Result-based error handling
- Useful for interfacing with non-FP code

### Logical Utilities

#### complement

- Logical NOT for predicate functions
- Returns function with inverted boolean result
- Common use: `filter(complement(isEmpty))`
- Pure function - no error handling needed
- Should validate predicate returns boolean
- Consider adding runtime check for boolean return

### Constant & Identity

#### constant

- K combinator from combinatory logic
- Returns function that ignores arguments and returns fixed value
- Common use: `map(constant(0))` to replace all values
- Pure function - cannot fail
- No migration needed

#### identity

- I combinator from combinatory logic
- Returns argument unchanged
- Common use: default transformation, `flatMap(identity)` to flatten
- Pure function - cannot fail
- No migration needed

### Argument Selection

#### nthArg

- Returns function that extracts nth argument
- Supports negative indices (count from end)
- Returns `undefined` if index out of bounds
- Common use: `map(nthArg(1))` to extract second element
- Should return error for out-of-bounds instead of undefined
- Should validate n is integer

#### of

- Wraps value in single-element array
- Applicative "pure" operation
- Common use: `flatMap(of)` in monadic operations
- Pure function - cannot fail
- No migration needed

---

## Implementation Dependencies

### Validation Dependencies

- **debounce** depends on `isNotUndefined`
- **throttle** depends on `isNotUndefined`, `isUndefined`
- **memoizeKey** depends on `isNull`, `isUndefined`
- Other utilities are self-contained

### Array Operation Dependencies

- **of** creates single-element array
- Most utilities don't have array dependencies

### Timing Dependencies

- **debounce** uses `setTimeout`, `clearTimeout`
- **throttle** uses `setTimeout`, `clearTimeout`, `Date.now()`
- Both are inherently impure - should be marked `[IO]`

### Helper Function Dependencies

- **memoizeKey** has complex internal logic for key generation
- **throttle** has complex timing logic with multiple state variables

### Refactoring Requirements

Functions using arrow syntax that need conversion to named functions:

- **tap** (arrow function)
- **constant** (arrow function)
- **identity** (arrow function) - **Note**: This is symbolic link, may be intentional
- **nthArg** (arrow function)
- **of** (arrow function)

Functions with imperative constructs:

- **memoize** uses `Map` and mutation - acceptable for memoization
- **memoizeWith** uses `Map` and mutation - acceptable for memoization
- **memoizeKey** uses `let`, `for` loop, WeakSet - acceptable for complexity
- **debounce** uses `let` for timeout ID - acceptable for timing
- **throttle** uses `let` for state tracking - acceptable for timing
- **once** uses `let` for flag and result - acceptable for once semantics

Note: Timing and memoization functions legitimately need mutable state for their semantics.

---

## Notes

### Pure vs Impure Utilities

#### Pure Functions (No Side Effects)

- **complement**: Pure transformation of predicates
- **constant**: Pure - always returns same value
- **identity**: Pure - returns argument unchanged
- **of**: Pure - creates array from value
- **nthArg**: Pure - extracts argument by index

#### Impure Functions (Side Effects)

- **tap**: Explicitly runs side effects
- **debounce**: Uses setTimeout (IO)
- **throttle**: Uses setTimeout and Date.now() (IO)
- **once**: Mutable state (cached result)
- **memoize**: Mutable state (cache)
- **memoizeWith**: Mutable state (cache)

#### Error Handling

- **tryCatch**: Catches exceptions (side-effect of exception handling)

### Combinatory Logic

Several functions correspond to classic combinators:

- **identity**: I combinator - `I x = x`
- **constant**: K combinator - `K x y = x`
- **complement**: Logical negation combinator

### Memoization Strategies

Three different approaches to memoization:

1. **memoize**: Automatic key generation via JSON.stringify
   - Pros: No configuration needed
   - Cons: Fails on non-JSON-serializable values

2. **memoizeWith**: Custom key generator
   - Pros: Full control over cache keys
   - Cons: Must provide key generator

3. **memoizeKey**: Sophisticated key generator factory
   - Pros: Handles complex types, configurable
   - Cons: Complex implementation, more overhead

Choose based on use case:

- Simple types → `memoize`
- Custom keys → `memoizeWith`
- Complex types → `memoizeWith(memoizeKey(options))`

### Debounce vs Throttle

Key differences:

**Debounce**:

- Delays execution until idle period
- Resets timer on each call
- Only last call executes
- Use for: user input, search, resize

**Throttle**:

- Ensures minimum time between executions
- First call executes immediately
- Subsequent calls queued
- Use for: scroll handlers, rate limiting, animation

### Testing Considerations

When migrating, ensure comprehensive tests for:

#### Memoization

- Cache hits and misses
- Cache clearing
- Different argument types
- Circular references (should error gracefully)
- Cache key collisions

#### Timing

- Debounce delay behavior
- Throttle rate limiting
- Cancel method functionality
- Multiple rapid calls
- Timer cleanup

#### Once

- First execution
- Subsequent calls return cached value
- Reset functionality
- Error on first call behavior

#### Error Handling

- tryCatch with throwing functions
- tryCatch with successful functions
- Error handler receiving correct arguments

#### Utilities

- tap preserving values through pipeline
- complement inverting predicates correctly
- nthArg with positive and negative indices
- nthArg with out-of-bounds indices

### Performance Considerations

#### Memoization Overhead

- Map lookup is O(1) but has overhead
- Key generation (especially JSON.stringify) can be expensive
- Only memoize expensive functions
- Consider memory usage of cache
- Implement cache size limits if needed

#### Timing Function Overhead

- setTimeout/clearTimeout have minimal overhead
- Debounce/throttle wrappers create closures
- State tracking has minimal memory impact
- Cancel functionality important for cleanup

#### Once Function

- Minimal overhead after first call
- Single boolean flag and cached value
- No timer or complex state

### Common Use Cases

#### tap

- Debugging: `pipe([transform, tap(console.log), transform2])`
- Logging: `tap(logger.info)`
- Assertions: `tap(assert.isValid)`

#### memoize

- Expensive computations: `memoize(fibonacci)`
- API responses: `memoize(fetchUserData)`
- Recursive algorithms: `memoize(recursiveFunc)`

#### debounce

- Search-as-you-type: `debounce(300, performSearch)`
- Window resize: `debounce(150, handleResize)`
- Form validation: `debounce(500, validateForm)`

#### throttle

- Scroll handlers: `throttle(100, onScroll)`
- Mouse move: `throttle(50, onMouseMove)`
- API rate limiting: `throttle(1000, apiCall)`

#### once

- Initialization: `const init = once(initialize)`
- Singleton creation: `const getInstance = once(createInstance)`
- One-time setup: `const setup = once(setupEnvironment)`

#### tryCatch

- Legacy code: `tryCatch(throwingFunc, handleError)`
- JSON parsing: `tryCatch(JSON.parse, returnDefault)`
- External libraries: `tryCatch(externalCall, logError)`
