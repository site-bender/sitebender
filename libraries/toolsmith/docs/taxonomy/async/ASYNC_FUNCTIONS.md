# Async - Asynchronous Control Flow Functions

**Location**: `src/async/`
**Functions**: 10
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### delay

- **Current**: `(milliseconds: number) => <T = void>(value?: T) => Promise<T>`
- **Returns**: Promise<T> (rejects on invalid milliseconds)
- **Description**: Delays execution for a specified duration
- **Target**: `(milliseconds: number) => <T = void>(value?: T) => Promise<Result<AsyncError, T>>`

### delayReject

- **Current**: `(milliseconds: number) => <E = Error>(error?: E) => Promise<never>`
- **Returns**: Promise<never> (always rejects after delay)
- **Description**: Delays then rejects with an error
- **Target**: `(milliseconds: number) => <E = Error>(error?: E) => Promise<Result<AsyncError, never>>`

### parallel

- **Current**: `<T>(tasks: ReadonlyArray<() => Promise<T>>) => Promise<Array<T>>`
- **Returns**: Promise<Array<T>> (resolves when all tasks complete)
- **Description**: Executes async functions concurrently
- **Target**: `<T>(tasks: ReadonlyArray<() => Promise<T>>) => Promise<Result<AsyncError, Array<T>>>`

### parallelLimit

- **Current**: `(limit: number) => <T>(tasks: ReadonlyArray<() => Promise<T>>) => Promise<Array<T>>`
- **Returns**: Promise<Array<T>> (throws on invalid limit)
- **Description**: Limits concurrent async function execution
- **Target**: `(limit: number) => <T>(tasks: ReadonlyArray<() => Promise<T>>) => Promise<Result<AsyncError, Array<T>>>`

### race

- **Current**: `<T>(tasks: ReadonlyArray<() => Promise<T>>) => Promise<T>`
- **Returns**: Promise<T> (throws on empty array)
- **Description**: Races async functions and returns the first to complete
- **Target**: `<T>(tasks: ReadonlyArray<() => Promise<T>>) => Promise<Result<AsyncError, T>>`

### retry

- **Current**: `(options?: RetryOptions) => <T>(fn: () => Promise<T>) => Promise<T>`
- **Options**: `{ attempts?: number, delay?: number, exponential?: boolean, multiplier?: number, maxDelay?: number, jitter?: boolean, shouldRetry?: (error: unknown, attempt: number) => boolean, onError?: (error: unknown, attempt: number, nextDelay: number) => void, onSuccess?: (result: unknown, attempts: number) => void }`
- **Returns**: Promise<T> (throws on invalid options or final failure)
- **Description**: Retries failed async operations with configurable strategies
- **Target**: `(options?: RetryOptions) => <T>(fn: () => Promise<T>) => Promise<Result<AsyncError, T>>`

### series

- **Current**: `async <T>(tasks: ReadonlyArray<() => Promise<T>>) => Promise<Array<T>>`
- **Returns**: Promise<Array<T>>
- **Description**: Executes async functions sequentially
- **Target**: `<T>(tasks: ReadonlyArray<() => Promise<T>>) => Promise<Result<AsyncError, Array<T>>>`

### timeout

- **Current**: `(milliseconds: number) => <E = Error>(error?: E) => <T>(promise: Promise<T>) => Promise<T>`
- **Returns**: Promise<T> (rejects on timeout or invalid milliseconds)
- **Description**: Adds a time limit to any Promise
- **Target**: `(milliseconds: number) => <E = Error>(error?: E) => <T>(promise: Promise<T>) => Promise<Result<AsyncError, T>>`

### waterfall

- **Current**: `<I, O = I>(initial: I) => async <T extends ReadonlyArray<(arg: Awaited<I>) => Promise<unknown>>>(tasks: T) => Promise<T extends ReadonlyArray<(...args: unknown[]) => Promise<infer R>> ? R : Awaited<I>>`
- **Returns**: Promise with inferred return type from last function in chain
- **Description**: Pipes async functions, passing results through a chain
- **Target**: `<I, O = I>(initial: I) => <T extends ReadonlyArray<(arg: Awaited<I>) => Promise<unknown>>>(tasks: T) => Promise<Result<AsyncError, T extends ReadonlyArray<(...args: unknown[]) => Promise<infer R>> ? R : Awaited<I>>>`

### whilst

- **Current**: `<T>(predicate: () => boolean) => (fn: () => Promise<T>) => Promise<Array<T>>`
- **Returns**: Promise<Array<T>> (accumulates all results)
- **Description**: Loops async operations while a condition holds
- **Target**: `<T>(predicate: () => boolean) => (fn: () => Promise<T>) => Promise<Result<AsyncError, Array<T>>>`

---

## Migration Notes

Async control flow functions will be converted to Result-wrapped Promise-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `Promise<ok(value)>` when async operation succeeds
2. Return `Promise<error(AsyncError)>` when async operation fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve control flow semantics (parallel, series, race, etc.)
5. Replace thrown errors with explicit error values
6. Replace Promise.reject with Result error values

## Special Considerations

### Error Handling Patterns

#### Functions Using Promise.reject

- **delay** - Rejects on invalid milliseconds (< 0 or non-finite)
- **delayReject** - Rejects on invalid milliseconds (< 0 or non-finite)
- **timeout** - Rejects on invalid milliseconds (< 0 or non-finite)
- These should return `Promise<error(AsyncError)>` in monadic form

#### Functions Using throw

- **race** - Throws on empty array ("Cannot race an empty array of tasks")
- **parallelLimit** - Throws on invalid limit (<= 0 or non-finite)
- **retry** - Throws on invalid options (attempts, delay, multiplier)
- These should return `Promise<error(AsyncError)>` in monadic form

### Arrow Function Refactoring Required

All functions use arrow syntax and need refactoring to named functions:

- **delay** (arrow function)
- **delayReject** (arrow function)
- **parallel** (arrow function)
- **race** (arrow function)
- **series** (arrow function - also uses async)
- **timeout** (arrow function)
- **waterfall** (arrow function - also uses async)
- **whilst** (arrow function)

### Constitutional Violations

#### Uses try/catch

- **retry** - Uses try/catch for error handling (lines 62-104)
- Should be refactored to use Result monad pattern

#### Uses await in async

- **series** - Uses async/await with reduce
- **waterfall** - Uses async/await with reduce
- **retry** - Uses async/await in recursive attemptFn
- **parallelLimit** - Uses await on runners
- These need careful refactoring to maintain Promise semantics without async/await

#### Uses Array.prototype methods

- **parallel** - Uses `tasks.map()`
- **race** - Uses `tasks.map()`
- **series** - Uses `tasks.reduce()`
- **waterfall** - Uses `tasks.reduce()`
- **parallelLimit** - Uses `tasks.map()` and `Array.from()`
- Should use functional equivalents from toolsmith

#### Uses let and loops

- **parallelLimit** - Uses `let nextTaskIndex = 0` (line 31)
- Should be refactored to functional approach

### Control Flow Semantics

#### Concurrent Execution

- **parallel** - Executes all tasks concurrently using Promise.all
- **parallelLimit** - Executes tasks with concurrency limit using runner pattern
- **race** - Executes all tasks concurrently using Promise.race
- **timeout** - Races original promise against timeout promise

#### Sequential Execution

- **series** - Executes tasks one after another, accumulating results
- **waterfall** - Executes tasks one after another, piping results through chain
- **whilst** - Executes task repeatedly while predicate is true, accumulating results

#### Retry Logic

- **retry** - Recursive retry with configurable delay strategies:
  - Fixed delay: Same delay between attempts
  - Exponential backoff: Multiplies delay by multiplier each attempt
  - Linear backoff: Adds delay * (multiplier - 1) each attempt
  - Jitter: Adds ±25% random variation to delay
  - Max delay cap: Limits maximum delay
  - Custom retry predicate: Controls whether to retry based on error
  - Callbacks: onError and onSuccess hooks

### Complex Type Signatures

#### waterfall

- Uses advanced TypeScript type inference
- Infers return type from last function in chain
- Generic over input type I and output type O
- Type-safe piping of values through async transformations
- Returns initial value when tasks array is empty

#### retry

- Complex options object with multiple configuration fields
- Generic over return type T
- Callbacks with specific signatures (onError, onSuccess)
- Custom shouldRetry predicate for conditional retry logic

### Empty Array Handling

#### Returns Empty Array

- **series** - Returns `[]` for empty tasks
- **parallelLimit** - Returns `[]` for empty tasks
- **parallel** - Returns `Promise.resolve([] as Array<T>)` for empty tasks

#### Returns Initial Value

- **waterfall** - Returns initial value for empty tasks

#### Throws Error

- **race** - Throws for empty tasks (would never resolve)

#### Returns Empty Accumulator

- **whilst** - Returns `[]` when predicate is initially false

### Validation Logic

#### delay

- Validates milliseconds >= 0 and isFinite
- Rejects promise on invalid input

#### delayReject

- Validates milliseconds >= 0 and isFinite
- Rejects promise on invalid input
- Uses provided error or creates default timeout error

#### timeout

- Validates milliseconds >= 0 and isFinite
- Rejects promise on invalid input
- Uses provided error or creates default timeout error
- Races original promise against timeout promise

#### retry

- Validates attempts > 0 and isFinite
- Validates delay >= 0 and isFinite
- Validates multiplier > 0 and isFinite
- Throws on invalid options

#### parallelLimit

- Validates limit > 0 and isFinite
- Throws on invalid limit
- Optimizes by using parallel execution when limit >= tasks.length

#### race

- Validates tasks array is not empty
- Throws on empty array
- Optimizes single task case by calling directly

### Special Implementation Patterns

#### parallelLimit - Runner Pattern

- Uses runner functions to manage concurrency
- Each runner processes tasks from shared queue (nextTaskIndex)
- Promise chaining (no await in loop) for sequential task processing per runner
- Creates exactly `min(limit, tasks.length)` runners
- Uses Set to track in-progress promises (unused variable _inProgress)

#### retry - Recursive Retry

- Recursive async function attemptFn
- Calculates next delay based on strategy (exponential vs linear)
- Applies jitter if enabled (±25% variation)
- Caps delay at maxDelay
- Calls custom shouldRetry predicate
- Invokes onError and onSuccess callbacks
- Re-throws error on final attempt or shouldRetry false

#### whilst - Recursive Accumulation

- Recursive async function iterate
- Accumulates results in array
- Checks predicate before each iteration
- Immutable accumulator updates using spread syntax
- Returns accumulated results when predicate becomes false

#### waterfall - Sequential Piping

- Uses reduce to pipe values through async functions
- Each function receives result from previous function
- Initial value becomes input to first function
- Returns initial value if tasks array is empty
- Type-safe inference of final return type

### Function Dependencies

#### isEmpty

- **parallel** - Depends on `isEmpty` from array utilities
- **parallelLimit** - Depends on `isEmpty` from array utilities
- **race** - Depends on `isEmpty` from array utilities
- **waterfall** - Depends on `isEmpty` from array utilities

#### Native Promise APIs

- **parallel** - Uses `Promise.all`
- **race** - Uses `Promise.race`
- **timeout** - Uses `Promise.race`
- **delay** - Uses `new Promise` with setTimeout
- **delayReject** - Uses `new Promise` with setTimeout
- **series** - Uses `Promise.resolve`
- **waterfall** - Uses `Promise.resolve`

### Refactoring Requirements

Functions that need functional rewrites:

- **series** - Uses async/await with reduce (should use functional composition)
- **waterfall** - Uses async/await with reduce (should use functional composition)
- **retry** - Uses async/await with try/catch (should use Result monad)
- **parallelLimit** - Uses let and await (should use functional approach)
- **parallel** - Uses Array.prototype.map (should use toolsmith map)
- **race** - Uses Array.prototype.map (should use toolsmith map)

---

## Notes

### Missing Standard Async Functions

Consider implementing these during migration:

- **debounce**: Delays function execution until after wait period of inactivity
- **throttle**: Limits function execution to once per time period
- **queue**: Async task queue with configurable concurrency
- **pool**: Resource pool for managing limited async resources
- **batch**: Batches async operations for bulk processing
- **memoize**: Caches async function results
- **compose**: Composes async functions right-to-left
- **pipe**: Pipes async functions left-to-right (waterfall is similar)
- **all**: Like Promise.all but with Result wrapper
- **allSettled**: Like Promise.allSettled but with Result wrapper
- **any**: Like Promise.any but with Result wrapper

### Promise vs Result<AsyncError, T>

The monadic migration should consider:

- Wrapping Promise resolution in Result monad
- Converting Promise rejection to error(AsyncError)
- Maintaining Promise for async operations but wrapping result in Result
- Type signature: `Promise<Result<AsyncError, T>>` not `Result<AsyncError, Promise<T>>`

### RetryOptions Type

The RetryOptions type needs better documentation:

- `attempts`: Maximum number of retry attempts (default: 3)
- `delay`: Initial delay in milliseconds (default: 0)
- `exponential`: Use exponential backoff (default: false)
- `multiplier`: Delay multiplier for backoff (default: 2 if exponential, 1 otherwise)
- `maxDelay`: Maximum delay cap in milliseconds (default: Infinity)
- `jitter`: Add random variation to delay (default: false)
- `shouldRetry`: Custom predicate to determine if retry should occur
- `onError`: Callback on each error with error, attempt number, and next delay
- `onSuccess`: Callback on success with result and total attempts

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Invalid inputs (negative delays, zero/negative limits, empty arrays)
- Edge cases (single task, timeout edge conditions)
- Concurrent execution correctness (parallel, parallelLimit, race)
- Sequential execution order (series, waterfall)
- Retry strategies (exponential, linear, jitter, max delay)
- Error propagation and Result wrapping
- Empty array handling across all functions
- Type inference correctness (especially waterfall)
- Promise rejection conversion to Result errors
