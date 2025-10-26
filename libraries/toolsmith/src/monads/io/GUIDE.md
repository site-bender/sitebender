# IO Monad Usage Guide

## Table of Contents

1. [Understanding IO Monads](#understanding-io-monads)
2. [When to Use Each Type](#when-to-use-each-type)
3. [Either: Branching, NOT Errors](#either-branching-not-errors)
4. [IoResult vs IoValidation](#ioresult-vs-iovalidation)
5. [Examples](#examples)

---

## Understanding IO Monads

The IO monad wraps side effects in a referentially transparent way. Instead of executing immediately, IO creates a **description** of a computation that can be executed later.

### Basic Principle

```typescript
// ❌ Impure - executes immediately
function getUserImmediate(): User {
	return fetch("/api/user") // Side effect happens now!
}

// ✅ Pure - deferred execution
function getUser(): Io<User> {
	return function executeGetUser(): User {
		return fetch("/api/user") // Side effect deferred until run
	}
}

// Execute when ready
const user = runIo(getUser())
```

---

## When to Use Each Type

### Io&lt;A&gt;

**Use when:** You need to defer a side effect that always produces a value.

**Examples:**

- Logging to console
- Getting current timestamp
- Reading environment variables
- DOM manipulation

```typescript
function logMessage(message: string): Io<void> {
	return function executeLog(): void {
		console.log(message)
	}
}
```

### IoMaybe&lt;A&gt;

**Use when:** A side effect might not produce a value (optional result).

**Examples:**

- Database query that might return no results
- Cache lookup that might miss
- Finding an element in the DOM that might not exist

```typescript
function findUserById(id: string): IoMaybe<User> {
	return function executeFindUser(): Maybe<User> {
		const user = database.findOne({ id })
		return user ? just(user) : nothing()
	}
}
```

### IoEither&lt;L, R&gt;

**IMPORTANT:** Either represents **branching logic** where BOTH sides are valid outcomes.

**Use when:** You have two different types of successful results.

**DO NOT use for error handling** - use IoResult or IoValidation instead.

**Examples:**

- Cached vs fresh data (both are successful)
- Local vs remote configuration (both are valid)
- Fast path vs slow path (both are correct)

See [Either: Branching, NOT Errors](#either-branching-not-errors) section below.

### IoResult&lt;E, T&gt;

**Use when:** You need **fail-fast** error handling in sequential operations.

**Characteristics:**

- Stops at the first error
- Error on LEFT, value on RIGHT
- Perfect for sequential/dependent operations

**Examples:**

- Reading a file, then parsing it, then validating it
- Making an API call, then processing the response
- Sequential form field validation where order matters

```typescript
function processFile(path: string): IoResult<FileError, ProcessedData> {
	return function executeProcess(): Result<FileError, ProcessedData> {
		// Stops at first error
		return pipe(
			readFile(path), // IoResult<FileError, string>
			chain(parseJson), // IoResult<ParseError, JsonData>
			chain(validateData), // IoResult<ValidationError, ProcessedData>
		)
	}
}
```

### IoValidation&lt;E, A&gt;

**Use when:** You need to **accumulate ALL errors** from parallel/independent operations.

**Characteristics:**

- Collects ALL errors (not just the first)
- Error on LEFT, value on RIGHT
- Perfect for parallel/independent validations

**Examples:**

- Form validation (show all field errors at once)
- Validating multiple independent configuration options
- Checking multiple file permissions

```typescript
function validateUser(
	data: unknown,
): IoValidation<Array<ValidationError>, User> {
	return function executeValidation(): Validation<
		Array<ValidationError>,
		User
	> {
		// Collects ALL errors
		return applicative(
			validateName(data.name), // Validation<Array<Error>, string>
			validateEmail(data.email), // Validation<Array<Error>, string>
			validateAge(data.age), // Validation<Array<Error>, number>
		)(createUser)
	}
}
```

### AsyncIoResult&lt;E, T&gt;

**Use when:** Async operations that should fail fast.

**Examples:**

- API calls
- File operations
- Database queries

### AsyncIoValidation&lt;E, A&gt;

**Use when:** Async operations that should accumulate errors.

**Examples:**

- Validating multiple remote resources
- Parallel API calls where you want all failures
- Checking multiple async constraints

### AsyncIoMaybe&lt;A&gt;

**Use when:** Async operations that might not return a value.

**Examples:**

- Cache lookup
- Optional remote resource

### AsyncIoEither&lt;L, R&gt;

**Use when:** Async operations with two valid result types.

**Examples:**

- Remote config with fallback to local (both valid)
- Primary API with fallback to secondary API (both valid)

---

## Either: Branching, NOT Errors

### ❌ WRONG: Using Either for Errors

```typescript
// DON'T DO THIS - Either is NOT for errors!
function readFile(path: string): IoEither<Error, string> {
	return function executeRead(): Either<Error, string> {
		try {
			return right(fs.readFileSync(path))
		} catch (error) {
			return left(error) // ❌ Treating left as an error
		}
	}
}
```

**Why this is wrong:**

- Either represents two **equally valid** outcomes
- Errors are NOT valid outcomes - they're failures
- Use IoResult or IoValidation for error handling

### ✅ CORRECT: Using Either for Branching

```typescript
// ✅ Both sides are successful outcomes
function getConfig(): IoEither<CachedConfig, FreshConfig> {
	return function executeGetConfig(): Either<CachedConfig, FreshConfig> {
		const cached = cache.get("config")
		if (cached && !isStale(cached)) {
			return left(cached) // Cached data (successful)
		} else {
			return right(fetchFreshConfig()) // Fresh data (successful)
		}
	}
}

// ✅ Two different valid algorithms
function findPath(
	graph: Graph,
): IoEither<FastPathResult, ComprehensivePathResult> {
	return function executeFindPath(): Either<
		FastPathResult,
		ComprehensivePathResult
	> {
		if (canUseFastAlgorithm(graph)) {
			return left(fastDijkstra(graph)) // Fast path (valid)
		} else {
			return right(comprehensiveBellmanFord(graph)) // Slow but complete (valid)
		}
	}
}

// ✅ Local vs remote configuration
function loadConfig(): IoEither<LocalConfig, RemoteConfig> {
	return function executeLoad(): Either<LocalConfig, RemoteConfig> {
		if (isOfflineMode()) {
			return left(loadLocalConfig()) // Local config (valid)
		} else {
			return right(fetchRemoteConfig()) // Remote config (valid)
		}
	}
}
```

### Key Examples of Proper Either Usage

| Use Case          | Type Signature                         | Why Either?                               |
| ----------------- | -------------------------------------- | ----------------------------------------- |
| Cache hit/miss    | `IoEither<CachedData, FreshData>`      | Both cached and fresh data are successful |
| Config source     | `IoEither<LocalConfig, RemoteConfig>`  | Both sources are valid                    |
| Algorithm choice  | `IoEither<FastResult, AccurateResult>` | Both algorithms are correct               |
| Fallback strategy | `IoEither<PrimaryData, FallbackData>`  | Both strategies are valid                 |

---

## IoResult vs IoValidation

### Quick Decision Guide

**Use IoResult when:**

- ✅ Operations are **sequential/dependent**
- ✅ You want to **stop at the first error**
- ✅ Later operations depend on earlier successes
- ✅ Errors make continuing pointless

**Use IoValidation when:**

- ✅ Operations are **parallel/independent**
- ✅ You want to **collect ALL errors**
- ✅ Operations don't depend on each other
- ✅ Users benefit from seeing all errors at once

### Detailed Comparison

| Aspect              | IoResult                     | IoValidation                   |
| ------------------- | ---------------------------- | ------------------------------ |
| **Error handling**  | Fail-fast (first error)      | Accumulation (all errors)      |
| **Use case**        | Sequential operations        | Parallel validations           |
| **Stops on error?** | Yes                          | No                             |
| **Error type**      | Single error `E`             | Array of errors `Array<E>`     |
| **Example**         | File read → parse → validate | Form with 5 independent fields |

### Example: Sequential (IoResult)

```typescript
// Operations are sequential - each depends on the previous
function processDocument(path: string): IoResult<DocumentError, Document> {
	return function executeProcess(): Result<DocumentError, Document> {
		return pipe(
			readFile(path), // Step 1: Read file
			chain(parseMarkdown), // Step 2: Parse (needs file content)
			chain(validateSchema), // Step 3: Validate (needs parsed data)
			chain(transformToHtml), // Step 4: Transform (needs validated data)
		)
	}
}

// If readFile fails, no point continuing to parseMarkdown
// Fail-fast is appropriate here
```

### Example: Parallel (IoValidation)

```typescript
// Operations are independent - can all be checked
function validateRegistration(
	data: unknown,
): IoValidation<Array<ValidationError>, Registration> {
	return function executeValidation(): Validation<
		Array<ValidationError>,
		Registration
	> {
		return applicative(
			validateUsername(data.username), // Independent check
			validateEmail(data.email), // Independent check
			validatePassword(data.password), // Independent check
			validateAge(data.age), // Independent check
			validateTerms(data.terms), // Independent check
		)(createRegistration)
	}
}

// Even if username is invalid, we still want to check email, password, etc.
// User benefits from seeing ALL validation errors at once
```

### Real-World Scenarios

#### Scenario 1: API Request Pipeline

```typescript
// Sequential operations - use IoResult
function fetchUserProfile(
	userId: string,
): AsyncIoResult<ApiError, UserProfile> {
	return function executeFetch(): Promise<Result<ApiError, UserProfile>> {
		return pipe(
			authenticateUser(), // Must succeed first
			chain(() => getUserData(userId)), // Depends on auth
			chain(enrichWithPreferences), // Depends on user data
			chain(formatForDisplay), // Depends on enriched data
		)
	}
}
```

#### Scenario 2: Configuration Validation

```typescript
// Independent validations - use IoValidation
function validateAppConfig(
	config: unknown,
): IoValidation<Array<ConfigError>, AppConfig> {
	return function executeValidation(): Validation<
		Array<ConfigError>,
		AppConfig
	> {
		return applicative(
			validateDatabaseUrl(config.db), // Independent
			validateApiKeys(config.keys), // Independent
			validateLogLevel(config.logging), // Independent
			validateCacheTtl(config.cache), // Independent
			validatePortNumber(config.port), // Independent
		)(createAppConfig)
	}
}
```

### Common Mistake: Using Result for Independent Operations

```typescript
// ❌ WRONG - Using Result for independent validations
function validateForm(data: unknown): IoResult<ValidationError, Form> {
	return function executeValidation(): Result<ValidationError, Form> {
		return pipe(
			validateName(data.name), // Stops here if name invalid
			chain(() => validateEmail(data.email)), // Never checked if name fails
			chain(() => validatePhone(data.phone)), // Never checked if email fails
		)
	}
}
// User only sees FIRST error, not all validation errors

// ✅ CORRECT - Using Validation for independent validations
function validateForm(
	data: unknown,
): IoValidation<Array<ValidationError>, Form> {
	return function executeValidation(): Validation<
		Array<ValidationError>,
		Form
	> {
		return applicative(
			validateName(data.name), // All checked
			validateEmail(data.email), // All checked
			validatePhone(data.phone), // All checked
		)(createForm)
	}
}
// User sees ALL validation errors at once
```

---

## Examples

### Example 1: Logging (Io)

```typescript
import io from "@sitebender/toolsmith/monads/io/io"
import runIo from "@sitebender/toolsmith/monads/io/runIo"

function logMessage(message: string): Io<void> {
	return io(function executeLog(): void {
		console.log(`[LOG] ${message}`)
	})
}

// Defer execution
const logAction = logMessage("Hello, world!")

// Execute when ready
runIo(logAction) // Prints: [LOG] Hello, world!
```

### Example 2: Optional Database Query (IoMaybe)

```typescript
import ioMaybe from "@sitebender/toolsmith/monads/io/ioMaybe"
import type { IoMaybe } from "@sitebender/toolsmith/types/fp/io"
import { just, nothing } from "@sitebender/toolsmith/monads/maybe"

function findUser(id: string): IoMaybe<User> {
	return ioMaybe(function executeFindUser(): Maybe<User> {
		const user = database.findById(id)
		return user ? just(user) : nothing()
	})
}
```

### Example 3: Branching with Cache (IoEither)

```typescript
import ioEither from "@sitebender/toolsmith/monads/io/ioEither"
import type { IoEither } from "@sitebender/toolsmith/types/fp/io"
import { left, right } from "@sitebender/toolsmith/monads/either"

type CachedData = { source: "cache"; data: string; cachedAt: number }
type FreshData = { source: "api"; data: string; fetchedAt: number }

function getData(key: string): IoEither<CachedData, FreshData> {
	return ioEither(function executeGetData(): Either<CachedData, FreshData> {
		const cached = cache.get(key)
		if (cached && !isStale(cached)) {
			return left({
				source: "cache",
				data: cached.value,
				cachedAt: cached.timestamp,
			})
		} else {
			const fresh = api.fetch(key)
			return right({
				source: "api",
				data: fresh,
				fetchedAt: Date.now(),
			})
		}
	})
}

// Both branches are successful outcomes
// Left = cached data (valid), Right = fresh data (valid)
```

### Example 4: File Processing (IoResult)

```typescript
import ioResult from "@sitebender/toolsmith/monads/io/ioResult"
import type { IoResult } from "@sitebender/toolsmith/types/fp/io"
import { error, ok } from "@sitebender/toolsmith/monads/result"

type FileError =
	| { _tag: "FileNotFound"; path: string }
	| { _tag: "ParseError"; message: string }
	| { _tag: "ValidationError"; errors: Array<string> }

function processFile(path: string): IoResult<FileError, ProcessedData> {
	return ioResult(function executeProcess(): Result<FileError, ProcessedData> {
		// Sequential operations - fail fast
		const fileContent = readFile(path)
		if (!fileContent) {
			return error({ _tag: "FileNotFound", path })
		}

		const parsed = parseJson(fileContent)
		if (!parsed) {
			return error({ _tag: "ParseError", message: "Invalid JSON" })
		}

		const validated = validateSchema(parsed)
		if (!validated.valid) {
			return error({ _tag: "ValidationError", errors: validated.errors })
		}

		return ok(validated.data)
	})
}
```

### Example 5: Form Validation (IoValidation)

```typescript
import ioValidation from "@sitebender/toolsmith/monads/io/ioValidation"
import type { IoValidation } from "@sitebender/toolsmith/types/fp/io"
import { invalid, valid } from "@sitebender/toolsmith/monads/validation"

type ValidationError = { field: string; message: string }

function validateRegistration(
	data: unknown,
): IoValidation<Array<ValidationError>, Registration> {
	return ioValidation(
		function executeValidation(): Validation<
			Array<ValidationError>,
			Registration
		> {
			const errors: Array<ValidationError> = []

			// Collect ALL errors
			if (!isValidUsername(data.username)) {
				errors.push({
					field: "username",
					message: "Username must be 3-20 chars",
				})
			}

			if (!isValidEmail(data.email)) {
				errors.push({ field: "email", message: "Invalid email format" })
			}

			if (!isValidPassword(data.password)) {
				errors.push({ field: "password", message: "Password too weak" })
			}

			if (!data.agreedToTerms) {
				errors.push({ field: "terms", message: "Must agree to terms" })
			}

			if (errors.length > 0) {
				return invalid(errors) // Return ALL errors
			}

			return valid({
				username: data.username,
				email: data.email,
				password: hashPassword(data.password),
			})
		},
	)
}
```

### Example 6: Async API Call (AsyncIoResult)

```typescript
import asyncIoResult from "@sitebender/toolsmith/monads/io/asyncIoResult"
import type { AsyncIoResult } from "@sitebender/toolsmith/types/fp/io"
import runAsyncIo from "@sitebender/toolsmith/monads/io/runAsyncIo"

type ApiError =
	| { _tag: "NetworkError"; message: string }
	| { _tag: "AuthError"; status: number }

function fetchUser(id: string): AsyncIoResult<ApiError, User> {
	return asyncIoResult(
		async function executeFetch(): Promise<Result<ApiError, User>> {
			try {
				const response = await fetch(`/api/users/${id}`)

				if (!response.ok) {
					return error({ _tag: "AuthError", status: response.status })
				}

				const user = await response.json()
				return ok(user)
			} catch (err) {
				return error({ _tag: "NetworkError", message: err.message })
			}
		},
	)
}

// Execute async IO
const result = await runAsyncIo(fetchUser("123"))
```

---

## Summary

### Type Selection Flowchart

```
Does the operation involve side effects?
├─ No → Use pure functions
└─ Yes → Continue

Is the side effect async?
├─ Yes → Use AsyncIo* variant
└─ No → Use Io* variant

What kind of result does it produce?
├─ Always produces a value → Io<A>
├─ Might not produce a value → IoMaybe<A>
├─ Two different valid result types → IoEither<L, R>
├─ Can fail (sequential) → IoResult<E, T>
└─ Can have multiple errors (parallel) → IoValidation<E, A>
```

### Key Reminders

1. **Either is for branching, NOT errors** - Both sides are valid outcomes
2. **IoResult for sequential** - Stop at first error
3. **IoValidation for parallel** - Collect all errors
4. **IO defers execution** - Side effects don't happen until run
5. **Error on LEFT, value on RIGHT** - For Result and Validation

---

For more details, see the type definitions in `types/fp/io/index.ts`.
