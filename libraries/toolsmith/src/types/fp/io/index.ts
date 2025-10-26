import type { Either } from "../either/index.ts"
import type { Maybe } from "../maybe/index.ts"
import type { Result } from "../result/index.ts"
import type { Validation } from "../validation/index.ts"

//++ IO monad represents a deferred computation that performs side effects when executed.
//++ A thunk (() => A) that delays execution until explicitly run.
//++ Use this to wrap impure operations and maintain referential transparency.
export type Io<A> = () => A

//++ IO that returns a Maybe (optional value with side effects).
//++ Use when a side effect might not produce a value (database query returning no results).
export type IoMaybe<A> = Io<Maybe<A>>

//++ IMPORTANT: Either represents branching logic where BOTH left and right are valid outcomes.
//++ It is NOT for error handling - use Result (fail-fast) or Validation (accumulation).
//++ Example use cases:
//++   - IoEither<CachedData, FreshData> - both cached and fresh data are successful
//++   - IoEither<LocalConfig, RemoteConfig> - either source is valid
//++   - IoEither<FastPath, SlowPath> - different algorithms, both correct
//++ If one side represents an error, use IoResult or IoValidation instead.
export type IoEither<L, R> = Io<Either<L, R>>

//++ Result for fail-fast error handling in sequential operations.
//++ Error on LEFT, value on RIGHT - stops at first error.
//++ Use when: operations depend on each other, want to stop at first failure.
//++ Example: reading a file, then parsing it, then validating - any step can fail.
export type IoResult<E, T> = Io<Result<E, T>>

//++ Validation for error accumulation in parallel/tree operations.
//++ Error on LEFT, value on RIGHT - collects ALL errors.
//++ Use when: validating multiple independent fields, want all validation errors.
//++ Example: form validation where you want to show all field errors at once.
export type IoValidation<E, A> = Io<Validation<E, A>>

//++ Async IO that returns a Result (Promise-based fail-fast error handling).
//++ Error on LEFT, value on RIGHT - stops at first error.
//++ Use for: async operations that should fail fast (API calls, file operations).
export type AsyncIoResult<E, T> = () => Promise<Result<E, T>>

//++ Async IO that returns a Validation (Promise-based error accumulation).
//++ Error on LEFT, value on RIGHT - collects ALL errors.
//++ Use for: async validation of multiple independent resources.
export type AsyncIoValidation<E, A> = () => Promise<Validation<E, A>>

//++ Async IO that returns a Maybe (Promise-based optional value).
//++ Use for: async operations that might not return a value (cache lookup).
export type AsyncIoMaybe<A> = () => Promise<Maybe<A>>

//++ Async IO that returns an Either (Promise-based branching).
//++ IMPORTANT: Both left and right are valid outcomes - NOT for errors.
//++ Use for: async operations with two valid result types.
export type AsyncIoEither<L, R> = () => Promise<Either<L, R>>
