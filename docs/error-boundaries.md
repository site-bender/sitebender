# Effect Boundaries and Async Composition Patterns

## Purpose

This document defines standard patterns for handling effect boundaries, async composition, and error type unification in our functional TypeScript codebase.

## Core Principles

1. **Errors are values** - Never throw exceptions; return Result or Validation
2. **Effects are explicit** - IO, async operations, and state changes are marked in types
3. **Composition is pure** - Combine effects through pure functions, run them at boundaries

## Error Type Unification

When composing effects with different error types, create a union type and conversion functions:

```typescript
// Define domain error types
type DbError = { _tag: 'DbError', message: string, code: string }
type ApiError = { _tag: 'ApiError', status: number, body: string }
type ValidationError = { _tag: 'ValidationError', field: string, message: string }

// Create unified error type
type ApplicationError = DbError | ApiError | ValidationError

// Conversion functions
function toApplicationError(error: DbError | ApiError | ValidationError): ApplicationError {
  return error
}

// Or more specific converters
function dbErrorToApplicationError(error: DbError): ApplicationError {
  return error
}

function apiErrorToApplicationError(error: ApiError): ApplicationError {
  return error
}
```

## Async Composition Helpers

Standard helpers for composing async operations that return Result:

```typescript
// Sequential composition - run promises in order, short-circuit on first error
function sequenceResults<A, E>(
  promises: Array<Promise<Result<A, E>>>
): Promise<Result<Array<A>, E>>

// Parallel composition - run all promises, short-circuit on first error
function allResults<A, E>(
  promises: Array<Promise<Result<A, E>>>
): Promise<Result<Array<A>, E>>

// Accumulate all errors (for validation)
function validateAll<A, E>(
  validations: Array<Validation<A, E>>
): Validation<Array<A>, Array<E>>
```

## Effect Runners

Explicit, named functions that "run" effects at the boundary of pure code:

```typescript
// Run an IO effect (for side effects that can't fail)
function runIO<A>(io: IO<A>): A

// Run an async effect, throw on error (use at top-level handlers only)
function runAsync<A, E>(asyncResult: Promise<Result<A, E>>): Promise<A>

// Unsafe runner for effects (use only at application boundaries)
function unsafeRun<A>(effect: Effect<A>): A
```

## Location in Toolsmith

These helpers should be organized in Toolsmith as:

```
libraries/toolsmith/src/
  boxed/
    result/
      sequenceResults/
      allResults/
    validation/
      validateAll/
    io/
      runIO/
      unsafeRun/
    async/
      runAsync/
```

## Usage Examples

### Composing Different Error Types

```typescript
// Convert specific errors to unified error type
function fetchUser(id: UserId): Promise<Result<User, ApplicationError>> {
  return fetchFromDb(id)
    .then(mapResult(function identityUser(user) {
      return user
    }))
    .then(mapErr(dbErrorToApplicationError))
}

function validateUser(user: User): Result<ValidUser, ApplicationError> {
  return validate(user)
    |> mapErr(validationErrorToApplicationError)
}
```

### Sequential Async Operations

```typescript
async function createUserWorkflow(data: UserData): Promise<Result<User, ApplicationError>> {
  const results = await sequenceResults([
    validateUserData(data),
    checkEmailUnique(data.email),
    createUser(data),
  ])
  
  return results
}
```

### Parallel Operations with Error Accumulation

```typescript
function validateForm(form: FormData): Validation<ValidForm, Array<ApplicationError>> {
  const validations = [
    validateEmail(form.email),
    validatePassword(form.password),
    validateAge(form.age),
  ]
  
  return validateAll(validations)
}
```

## Guidelines

1. **Never mix error types** - Always unify to a single error type before composition
2. **Run effects at boundaries** - Keep core logic pure, run effects at edges
3. **Make effects explicit** - Types should show whether function does IO, async, etc.
4. **Use appropriate helper** - sequenceResults for dependent operations, allResults for independent
5. **Accumulate when validating** - Use validateAll to collect all errors, not just first

## Anti-Patterns

❌ **Don't throw exceptions**
```typescript
// WRONG
async function getUser(id: string): Promise<User> {
  const result = await fetch(`/users/${id}`)

  if (not(result.ok)) {
    throw new Error('Failed')
  }

  return result.json()
}
```

✅ **Return Result**
```typescript
// RIGHT
function getUser(id: UserId): Promise<Result<User, ApiError>> {
  return fetch(`/users/${id}`)
    .then(function handleResponse(r) {
      return r.ok
        ? r.json().then(ok)
        : error({ _tag: 'ApiError', status: r.status, body: 'Failed' })
    })
}
```

❌ **Don't mix error types in composition**
```typescript
// WRONG - DbError and ApiError not unified
async function workflow() {
  const user = await fetchFromDb(id)  // Result<User, DbError>
  const posts = await fetchFromApi(user.id)  // Result<Posts, ApiError>

  return { user, posts }
}
```

✅ **Unify error types**
```typescript
// RIGHT
async function workflow(): Promise<Result<UserWithPosts, ApplicationError>> {
  const userResult = await fetchFromDb(id) |> mapError(dbErrorToApplicationError)
  const postsResult = await fetchFromApi(userId) |> mapError(apiErrorToApplicationError)
  
  return combineResults({ user: userResult, posts: postsResult })
}
