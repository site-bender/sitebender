# TypeScript & Functional Programming Rules

## All data structures must be immutable. Use const, ReadonlyArray<T>, Readonly<T>. Use freeze/deepFreeze via Toolsmith for runtime immutability

- **Rule ID**: FP_IMMUTABILITY_001
- **Description**: All data structures must be immutable. Use const, ReadonlyArray<T>, Readonly<T>. Use freeze/deepFreeze via Toolsmith for runtime immutability
- **Keywords**: immutability, functional-programming, typescript, readonly, const, freeze, deepfreeze, pure-functions, data-structures, mutations
- **Rationale**: Immutability eliminates entire classes of bugs related to unexpected state changes and makes code easier to reason about. Data flows through transformations rather than mutating in place. This prevents race conditions, debugging nightmares, and lost data that occur with mutable state.

**Prohibited:**
```ts
// ❌ PROHIBITED - Mutable operations:
const arr = [1, 2, 3]
arr.push(4) // Mutation

const obj = { name: 'John' }
obj.property = 'newValue' // Direct mutation

let items = ['a', 'b']
items = items.concat('c') // let allows reassignment
```

*Reasoning*: Mutations create unpredictable behavior, race conditions, and make debugging extremely difficult

**Required:**
```ts
// ✅ REQUIRED - Immutable patterns:
import { freeze, deepFreeze } from '@sitebender/toolsmith'

const oldArr: ReadonlyArray<number> = [1, 2, 3]
const newArr = [...oldArr, 4] // Spread creates new array

const oldObj: Readonly<{ name: string }> = { name: 'John' }
const newObj = { ...oldObj, property: 'newValue' } // New object

// Runtime immutability enforcement:
const config = freeze({ apiUrl: 'https://api.example.com' })
const deepConfig = deepFreeze({ nested: { data: [1, 2, 3] } })
```

*Scope*: All TypeScript/JavaScript code - no exceptions


## Application libraries must use Toolsmith boxed functions and return monads

- **Rule ID**: FP_APPLICATION_USE_BOXED_001
- **Description**: Application libraries must use Toolsmith boxed functions and return monads
- **Keywords**: toolsmith, boxed-functions, monads, application-code, result, validation, composability, error-handling, architect, artificer
- **Rationale**: Boxed functions provide monadic error handling and composability for application code. Using vanilla functions in applications loses error accumulation and monadic composition capabilities. Application code should be monadic while Toolsmith internals can be optimized with vanilla implementations.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using vanilla in application code:
// In architect/artificer/operator/custodian:
import validateEmail from '@sitebender/toolsmith/validation/validateEmail/index.ts'

function processUser(email: string): User | null {
	// Loses monadic composition
	const validated = validateEmail(email)
	if (!validated) return null
	// ...
}
```

*Reasoning*: Vanilla functions don't provide monadic error handling needed in application code

**Required:**
```ts
// ✅ REQUIRED - Boxed functions in applications:
import validateEmail from '@sitebender/toolsmith/boxed/validation/validateEmail/index.ts'
import type { Result } from '@sitebender/toolsmith/types'

function processUser(email: string): Result<User, ValidationError> {
	return pipe(
		email,
		validateEmail,
		map(createUser),
		map(enrichUserData)
	)
}
```

*Scope*: Required in architect, artificer, operator, custodian - all application libraries


## Return Result<T,E> for sequential fail-fast operations or Validation<T,E> for parallel error accumulation. Prefer these over Maybe<T> for error handling

- **Rule ID**: FP_MONADIC_RETURNS_001
- **Description**: Return Result<T,E> for sequential fail-fast operations or Validation<T,E> for parallel error accumulation. Prefer these over Maybe<T> for error handling
- **Keywords**: monads, result, validation, error-handling, functional-programming, fail-fast, error-accumulation, maybe, typescript
- **Rationale**: Result provides fail-fast sequential processing while Validation accumulates all errors for comprehensive feedback. Using Maybe for errors loses important error information. Error handling should be explicit and contextually appropriate - Result for sequential validation, Validation for parallel form validation.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using Maybe for error handling:
import type { Maybe } from '@sitebender/toolsmith/types'

function validateUser(data: unknown): Maybe<User> {
	// Lost error information - why did it fail?
	if (!isValid(data)) return nothing()
	return just(data as User)
}
```

*Reasoning*: Maybe loses error context - caller doesn't know why validation failed

**Required:**
```ts
// ✅ REQUIRED - Result for fail-fast, Validation for accumulation:
import type { Result, Validation } from '@sitebender/toolsmith/types'

// Result: Stop at first error
function validateUser(data: unknown): Result<User, ValidationError> {
	return pipe(
		data,
		validateEmail, // Stops here if invalid
		chain(validateAge),
		chain(validateName)
	)
}

// Validation: Collect all errors
function validateForm(fields: FormData): Validation<User, Array<ValidationError>> {
	return applicative(
		createUser,
		validateEmail(fields.email), // All run in parallel
		validateAge(fields.age),
		validateName(fields.name)
	) // Returns all errors if any fail
}
```

*Scope*: All error handling - use Result for fail-fast, Validation for error collection


## Toolsmith may use performance exceptions with [EXCEPTION] or [OPTIMIZATION] Envoy comments when ideology conflicts with performance requirements

- **Rule ID**: FP_TOOLSMITH_EXCEPTIONS_001
- **Description**: Toolsmith may use performance exceptions with [EXCEPTION] or [OPTIMIZATION] Envoy comments when ideology conflicts with performance requirements
- **Keywords**: toolsmith, performance, exceptions, optimization, pragmatic, foundation-library, hot-path, benchmarking, documentation
- **Rationale**: Toolsmith is the foundation library - performance optimizations justify pragmatic exceptions to pure FP rules. Performance bottlenecks in Toolsmith affect all dependent libraries. Pragmatic performance over ideological purity when building foundations, but exceptions must be documented.

**Prohibited:**
```ts
// ❌ PROHIBITED - Exception without documentation:
// In Toolsmith internal code:
function _fastMap<T, U>(items: Array<T>, fn: (item: T) => U): Array<U> {
	const result: Array<U> = []
	for (let i = 0; i < items.length; i++) {
		result.push(fn(items[i])) // No [EXCEPTION] comment
	}
	return result
}
```

*Reasoning*: Performance exceptions must be documented to track and justify FP violations

**Required:**
```ts
// ✅ REQUIRED - Documented exceptions:
// [EXCEPTION] Using .push() for O(1) amortized vs O(n) functional concat in hot path
function _fastMap<T, U>(items: ReadonlyArray<T>, fn: (item: T) => U): Array<U> {
	const result: Array<U> = []
	for (let i = 0; i < items.length; i++) {
		result.push(fn(items[i]))
	}
	return result
}

// [OPTIMIZATION] Loop approved for O(n) vs O(n²) functional approach
function _findIndex<T>(arr: ReadonlyArray<T>, pred: (item: T) => boolean): number {
	for (let i = 0; i < arr.length; i++) {
		if (pred(arr[i])) return i
	}
	return -1
}
```

*Scope*: ONLY in Toolsmith internal utilities - NEVER in application code


## Build complex operations by composing simple, focused functions. Use pipe for left-to-right composition, compose for right-to-left

- **Rule ID**: FP_COMPOSITION_001
- **Description**: Build complex operations by composing simple, focused functions. Use pipe for left-to-right composition, compose for right-to-left
- **Keywords**: composition, functional-programming, pipe, compose, modularity, reusability, testing, building-blocks, currying
- **Rationale**: Composition enables building sophisticated behavior from simple, well-tested building blocks. Each function does one thing well, making testing trivial and reuse natural. Monolithic functions are hard to test, understand, and reuse. Complex behavior emerges from simple function composition.

**Prohibited:**
```ts
// ❌ PROHIBITED - Monolithic function:
function processNumbers(nums: Array<number>): number {
	const result = []
	for (const n of nums) {
		if (n % 2 === 0) { // Manual filtering
			const doubled = n * 2 // Manual mapping
			result.push(doubled)
		}
	}
	// Manual reduction
	let sum = 0
	for (const r of result) {
		sum += r
	}
	return sum
}
```

*Reasoning*: Monolithic implementation is hard to test, understand, and reuse individual pieces

**Required:**
```ts
// ✅ REQUIRED - Composed from simple functions:
import { pipe, filter, map, reduce } from '@sitebender/toolsmith'
import { isEven, double, add } from './utilities'

const numbers: ReadonlyArray<number> = [1, 2, 3, 4, 5]

const result = pipe(
	numbers,
	filter(isEven),        // [2, 4]
	map(double),           // [4, 8]
	reduce(add)(0)         // 12
)

// Each function is simple, testable, reusable:
// - isEven can be tested independently
// - double can be reused elsewhere
// - add is a general utility
// - Composition is declarative and readable
```

*Scope*: All complex operations - compose simple functions instead of writing monoliths


## Write TypeScript, to the extent possible, as if you were writing Haskell

- **Rule ID**: RULE_FUNDAMENTAL_001
- **Description**: Write TypeScript, to the extent possible, as if you were writing Haskell
- **Keywords**: haskell, functional-programming, typescript, pure-functions, immutability, type-safety, monads, algebraic-data-types, philosophy
- **Rationale**: Haskell is the most beautiful language ever written. FP is proven better for reduced cognitive load, fewer bugs, and better parallel processing. Functional programming is not opinion - it's mathematically superior. Writing imperative/OOP style creates massive technical debt and blocks progress for weeks.

**Prohibited:**
```ts
// ❌ PROHIBITED - Imperative/OOP style:
class UserService {
	private users: Array<User> = []
	
	addUser(user: User): void {
		this.users.push(user) // Mutation
	}
	
	getActiveUsers(): Array<User> {
		const active = []
		for (const user of this.users) { // Imperative loop
			if (user.active) {
				active.push(user)
			}
		}
		return active
	}
}
```

*Reasoning*: OOP and imperative patterns create technical debt and violate FP principles

**Required:**
```ts
// ✅ REQUIRED - Haskell-inspired TypeScript:
import { pipe, filter, map } from '@sitebender/toolsmith'
import type { User } from './types'

// Pure function that returns new state
function addUser(users: ReadonlyArray<User>) {
	return function addUserToUsers(user: User): ReadonlyArray<User> {
		return [...users, user]
	}
}

// Pure, composable functions
const isActive = (user: User): boolean => user.active

function getActiveUsers(
	users: ReadonlyArray<User>
): ReadonlyArray<User> {
	return filter(isActive)(users)
}

// Think in transformations, not mutations
// Think in types, not objects
// Think in composition, not inheritance
```

*Scope*: All TypeScript code - approach problems functionally, not imperatively


## NO MAGIC NUMBERS. All non-obvious numbers must be named constants with descriptive names in SCREAMING_SNAKE_CASE

- **Rule ID**: FP_NO_MAGIC_NUMBERS_001
- **Description**: NO MAGIC NUMBERS. All non-obvious numbers must be named constants with descriptive names in SCREAMING_SNAKE_CASE
- **Keywords**: magic-numbers, constants, readability, maintainability, semantic-meaning, screaming-snake-case, self-documenting, clarity
- **Rationale**: Magic numbers are meaningless and create mystery meat code that's impossible to understand or maintain. Named constants explain WHY that value exists. Every number should have semantic meaning - whether it's a mathematical identity, a business rule, or a configuration value.

**Prohibited:**
```ts
// ❌ PROHIBITED - Magic numbers:
function retry(operation: () => Promise<void>) {
	if (attempts > 3) { // What is 3?
		throw new Error('Failed')
	}
}

setTimeout(callback, 5000) // Why 5000?

const result = items.slice(0, 10) // Why 10?
```

*Reasoning*: Magic numbers provide no context about their purpose or origin

**Required:**
```ts
// ✅ REQUIRED - Named constants:
const MAX_RETRY_ATTEMPTS = 3
const POLLING_INTERVAL_MS = 5000
const DEFAULT_PAGE_SIZE = 10
const ADDITIVE_IDENTITY = 0
const MULTIPLICATIVE_IDENTITY = 1
const HTTP_OK = 200
const MIN_PASSWORD_LENGTH = 8

function retry(operation: () => Promise<void>) {
	if (attempts > MAX_RETRY_ATTEMPTS) {
		throw new Error('Failed')
	}
}

setTimeout(callback, POLLING_INTERVAL_MS)

const result = items.slice(0, DEFAULT_PAGE_SIZE)

// Mathematical identities are obvious:
const sum = reduce(add)(ADDITIVE_IDENTITY)(numbers)
const product = reduce(multiply)(MULTIPLICATIVE_IDENTITY)(numbers)
```

*Scope*: All code - every non-obvious number must be a named constant


## Generator functions may use let/loops internally for performance - no Haskell equivalent exists

- **Rule ID**: FP_GENERATOR_EXCEPTIONS_001
- **Description**: Generator functions may use let/loops internally for performance - no Haskell equivalent exists
- **Keywords**: generators, lazy-evaluation, exceptions, let, loops, performance, memory-efficiency, pragmatic, streaming
- **Rationale**: Generators have no functional equivalent in Haskell. Performance and memory efficiency require imperative implementation. When language features have no functional equivalent, pragmatic implementation is acceptable. Forcing functional patterns on generators creates performance bottlenecks and memory issues.

**Prohibited:**
```ts
// ❌ PROHIBITED - Forcing functional style on generators:
function* range(start: number, end: number) {
	// This is awkward and defeats the purpose
	const sequence = Array.from({ length: end - start + 1 }, (_, i) => start + i)
	for (const n of sequence) {
		yield n
	}
}
```

*Reasoning*: Functional approaches defeat the memory efficiency that generators provide

**Required:**
```ts
// ✅ REQUIRED - Pragmatic generator implementation:
function* range(start: number, end: number) {
	let current = start
	
	while (current <= end) {
		yield current
		current++
	}
}

function* fibonacci() {
	let [a, b] = [0, 1]
	
	while (true) {
		yield a
		;[a, b] = [b, a + b]
	}
}

// Generators enable lazy evaluation:
const first10Fibs = take(10)(fibonacci())

// Permitted in generators:
// - let bindings for iteration state
// - while/for loops
// - Mutable counters within scope
```

*Scope*: Generator functions only - imperative patterns must stay within generator scope


## Single Responsibility Principle applies to modules, components, functions, types, and constants - each does ONE thing (Occam's Razor)

- **Rule ID**: FP_SINGLE_RESPONSIBILITY_001
- **Description**: Single Responsibility Principle applies to modules, components, functions, types, and constants - each does ONE thing (Occam's Razor)
- **Keywords**: single-responsibility, srp, occams-razor, simplicity, modularity, testing, reusability, cognitive-load, composability
- **Rationale**: Things that do multiple things are impossible to test, reuse, or understand. Simplicity reduces cognitive load. Multi-responsibility code becomes tangled spaghetti that breaks when you change anything. Do not needlessly complicate things - Occam's Razor in action.

**Prohibited:**
```ts
// ❌ PROHIBITED - Multiple responsibilities:
function processUser(data: unknown): Promise<void> {
	// Validates
	if (!isValidEmail(data.email)) throw new Error('Invalid')
	
	// Transforms
	const user = {
		name: data.name.trim().toLowerCase(),
		email: data.email.toLowerCase()
	}
	
	// Saves to database
	await db.insert('users', user)
	
	// Sends email
	await sendWelcomeEmail(user.email)
	
	// Logs
	console.log(`User created: ${user.email}`)
}
```

*Reasoning*: Function does 5 things - impossible to test or reuse individual pieces

**Required:**
```ts
// ✅ REQUIRED - Single responsibility per function:
function validateUser(data: unknown): Result<ValidUser, ValidationError> {
	// ONLY validates
	return pipe(
		data,
		validateEmail,
		chain(validateName)
	)
}

function normalizeUser(user: ValidUser): NormalizedUser {
	// ONLY transforms
	return {
		name: user.name.trim().toLowerCase(),
		email: user.email.toLowerCase()
	}
}

function saveUser(user: NormalizedUser): Promise<Result<User, DbError>> {
	// ONLY saves
	return db.insert('users', user)
}

// Compose them:
function createUser(data: unknown): Promise<Result<User, Error>> {
	return pipe(
		data,
		validateUser,
		map(normalizeUser),
		chain(saveUser),
		tap(sendWelcomeEmail),
		tap(logUserCreation)
	)
}
```

*Scope*: All modules, components, functions, types, constants - each does ONE thing


## Functions must be pure except for isolated I/O operations - same inputs produce same outputs, no side effects

- **Rule ID**: FP_PURE_EXCEPT_IO_001
- **Description**: Functions must be pure except for isolated I/O operations - same inputs produce same outputs, no side effects
- **Keywords**: pure-functions, functional-programming, side-effects, io-boundaries, predictability, testing, memoization, parallelization, equational-reasoning
- **Rationale**: Purity enables equational reasoning, makes testing trivial, and allows safe memoization and parallelization. Impure functions create unpredictable behavior and testing nightmares. Pure functions are mathematical - predictable and composable. I/O operations must be isolated to specific boundary functions.

**Prohibited:**
```ts
// ❌ PROHIBITED - Impure functions:
let counter = 0

function addToCounter(n: number): number {
	counter += n // Side effect - modifies external state
	return counter
}

function processUser(user: User): User {
	console.log('Processing:', user.name) // Side effect - I/O
	user.lastProcessed = new Date() // Mutation
	return user
}

function getRandomUser(): User {
	return users[Math.random() * users.length] // Non-deterministic
}
```

*Reasoning*: Side effects make functions unpredictable, hard to test, and impossible to reason about

**Required:**
```ts
// ✅ REQUIRED - Pure functions with isolated I/O:
// Pure - same inputs always produce same outputs
function addNumbers(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}

// Pure - no mutations, returns new object
function processUser(user: Readonly<User>): Readonly<User> {
	return {
		...user,
		lastProcessed: new Date()
	}
}

// I/O isolated to boundary function
// [IO] This function performs side effects
function saveUserToDb(user: User): Promise<Result<User, DbError>> {
	return db.insert('users', user)
}

// Pure core logic composed with I/O boundaries:
function createAndSaveUser(data: unknown): Promise<Result<User, Error>> {
	return pipe(
		data,
		validateUser,      // Pure
		map(normalizeUser), // Pure
		chain(saveUserToDb) // I/O boundary
	)
}
```

*Scope*: All functions except explicit I/O boundaries marked with [IO] comment


## Vanilla functions for internal use where inputs are carefully guarded and monadic error handling not needed

- **Rule ID**: FP_VANILLA_INTERNAL_001
- **Description**: Vanilla functions for internal use where inputs are carefully guarded and monadic error handling not needed
- **Keywords**: toolsmith, vanilla-functions, performance, internal, trusted-data, optimization, hot-path, monads
- **Rationale**: Vanilla functions are more performant when inputs are guaranteed valid and error collection unnecessary. Using boxed functions internally adds unnecessary overhead. Right tool for the right job - vanilla for trusted internal use, boxed for applications.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using vanilla in public API:
// Public API exposed to applications:
export function validateEmail(email: string): string | null {
	// Returns null on error - loses error context
	if (!email || !email.includes('@')) return null
	return email.toLowerCase()
}
```

*Reasoning*: Public APIs need monadic error handling to provide error context

**Required:**
```ts
// ✅ REQUIRED - Vanilla for internal, boxed for public:

// Internal utility (vanilla):
// Path: /toolsmith/string/_toLowerCase/index.ts
function _toLowerCase(str: string): string | null {
	if (!str) return null
	return str.toLowerCase()
}

// Public API (boxed):
// Path: /toolsmith/boxed/validation/validateEmail/index.ts
import type { Result, ValidationError } from '@sitebender/toolsmith/types'

export default function validateEmail(
	email: string
): Result<string, ValidationError> {
	if (!email) {
		return failure({
			_tag: 'ValidationError',
			field: 'email',
			message: 'Email is required'
		})
	}
	
	if (!email.includes('@')) {
		return failure({
			_tag: 'ValidationError',
			field: 'email',
			message: 'Email must contain @'
		})
	}
	
	return success(email.toLowerCase())
}
```

*Scope*: Vanilla in Toolsmith internals only; boxed for all public APIs


## Use Either<L,R> for branching paths (left/right, this/that) with no implication that one is better than the other. Not for error handling

- **Rule ID**: FP_EITHER_BRANCHING_001
- **Description**: Use Either<L,R> for branching paths (left/right, this/that) with no implication that one is better than the other. Not for error handling
- **Keywords**: either, monads, branching, choices, alternatives, result, functional-programming, type-safety
- **Rationale**: Either represents choice between two valid options, unlike Result which implies success/failure. Conflating Either with error handling misses its true purpose as a branching construct. Either is for paths, Result is for outcomes.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using Either for error handling:
import type { Either } from '@sitebender/toolsmith/types'

function getUser(id: string): Either<Error, User> {
	// Treating left as error - use Result instead
	const user = findUser(id)
	return user ? right(user) : left(new Error('Not found'))
}
```

*Reasoning*: Either is for choices, not errors. Use Result for error handling.

**Required:**
```ts
// ✅ REQUIRED - Either for branching paths:
import type { Either, Result } from '@sitebender/toolsmith/types'

// Either for two valid alternatives:
function getUserData(
	userId: string
): Either<DatabaseResult, CacheResult> {
	const cached = cache.get(userId)
	if (cached) return right(cached) // From cache
	
	const fromDb = db.get(userId)
	return left(fromDb) // From database
}

// Both sides are valid data sources
function processUserData(
	data: Either<DatabaseResult, CacheResult>
): User {
	return match(data)(
		(dbResult) => dbResult.user,
		(cacheResult) => cacheResult.user
	)
}

// For errors, use Result:
function validateUser(id: string): Result<User, ValidationError> {
	return isValidId(id)
		? success(getUser(id))
		: failure({ _tag: 'ValidationError', message: 'Invalid ID' })
}
```

*Scope*: Use Either for branching between valid alternatives, Result for error handling


## Use generators for streaming data, lazy evaluation, state machines, and custom iteration where memory efficiency matters. Unlike Haskell's default laziness, be selective - use lazy only where it provides real benefits

- **Rule ID**: FP_GENERATOR_USAGE_001
- **Description**: Use generators for streaming data, lazy evaluation, state machines, and custom iteration where memory efficiency matters. Unlike Haskell's default laziness, be selective - use lazy only where it provides real benefits
- **Keywords**: generators, lazy-evaluation, streaming, memory-efficiency, infinite-sequences, performance, iteration, state-machines
- **Rationale**: Generators provide memory-efficient lazy evaluation for large data sets, infinite sequences, and expensive computations. Eager evaluation can cause memory issues with large data or unnecessary computation. Selective laziness - use where it matters, not everywhere like Haskell.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using generators where not needed:
function* addOne(numbers: Array<number>) {
	// Small array, eager evaluation is fine
	for (const n of numbers) {
		yield n + 1
	}
}

const result = [...addOne([1, 2, 3])] // Defeats lazy purpose
```

*Reasoning*: Generators add complexity for small data sets where eager evaluation is sufficient

**Required:**
```ts
// ✅ REQUIRED - Generators for memory efficiency:

// Good: Streaming large CSV files
function* readCsvLines(filePath: string) {
	const stream = createReadStream(filePath)
	let buffer = ''
	
	for await (const chunk of stream) {
		buffer += chunk
		const lines = buffer.split('\n')
		buffer = lines.pop() || ''
		
		for (const line of lines) {
			yield line
		}
	}
}

// Good: Infinite sequences
function* fibonacci() {
	let [a, b] = [0, 1]
	while (true) {
		yield a
		;[a, b] = [b, a + b]
	}
}

const first10 = take(10)(fibonacci())

// Good: API pagination
function* fetchAllUsers() {
	let page = 1
	while (true) {
		const users = await fetchPage(page)
		if (users.length === 0) break
		
		for (const user of users) {
			yield user
		}
		page++
	}
}

// Avoid: Small data, simple transformations
const small = [1, 2, 3]
const doubled = map(double)(small) // Eager is fine
```

*Scope*: Use for large data, infinite sequences, streaming - not for small collections


## Public functions use camelCase. Private functions prepend underscore: _privateFunction

- **Rule ID**: FUNC_NAMING_001
- **Description**: Public functions use camelCase. Private functions prepend underscore: _privateFunction
- **Keywords**: naming, camelcase, underscore, private, public, api, conventions, visibility
- **Rationale**: Underscore immediately signals 'internal only' and prevents accidental imports. Without clear public/private distinction, internal APIs get misused creating breaking changes. Visual distinction between public interface and internal implementation.

**Prohibited:**
```ts
// ❌ PROHIBITED - No visibility distinction:
export function processUser(user: User): User {
	return normalize(transform(user))
}

// These look public but should be private:
export function normalize(user: User): User { ... }
export function transform(user: User): User { ... }
```

*Reasoning*: Internal helpers look public, leading to unintended external usage

**Required:**
```ts
// ✅ REQUIRED - Clear public/private distinction:

// Public API - camelCase:
export default function processUser(user: Readonly<User>): Readonly<User> {
	return pipe(
		user,
		_normalize,
		_transform
	)
}

// Private helpers - underscore prefix:
function _normalize(user: Readonly<User>): Readonly<User> {
	return {
		...user,
		name: user.name.trim().toLowerCase()
	}
}

function _transform(user: Readonly<User>): Readonly<User> {
	return {
		...user,
		lastModified: new Date()
	}
}

// Only processUser is exported - internals stay internal
```

*Scope*: All functions - underscore prefix for private, camelCase for public


## NO abbreviations except: 1) Initialisms/acronyms (first letters of multiple words), 2) Approved whitelist: min, max, id, src, dest, temp, doc/docs, spec/specs, info, config, auth, demo, sync, async, ms, sec, hr, kb, mb, gb, tb

- **Rule ID**: NO_ABBREVIATIONS_001
- **Description**: NO abbreviations except: 1) Initialisms/acronyms (first letters of multiple words), 2) Approved whitelist: min, max, id, src, dest, temp, doc/docs, spec/specs, info, config, auth, demo, sync, async, ms, sec, hr, kb, mb, gb, tb
- **Keywords**: abbreviations, naming, readability, clarity, self-documenting, whitelist, natural-language
- **Rationale**: Abbreviations create cognitive load requiring mental translation. Full words are self-documenting. Abbreviations create mystery meat code requiring decoding. Natural language coding - write code that reads like English.

**Prohibited:**
```ts
// ❌ PROHIBITED - Abbreviations:
function calcTotal(vals: Array<number>): number {
	return vals.reduce((acc, val) => acc + val, 0)
}

const usrMsg = 'Hello'
const btnEl = document.querySelector('.btn')
const procResult = proc(data)
const impl = getImpl()
```

*Reasoning*: Abbreviations require mental translation and reduce code clarity

**Required:**
```ts
// ✅ REQUIRED - Full words:
function calculateTotal(values: ReadonlyArray<number>): number {
	return reduce(add)(ADDITIVE_IDENTITY)(values)
}

const userMessage = 'Hello'
const buttonElement = document.querySelector('.button')
const processedResult = process(data)
const implementation = getImplementation()

// Whitelist approved:
const min = 0
const max = 100
const userId = '123'
const srcPath = './source'
const destPath = './destination'
const tempValue = 42
const apiConfig = { url: '...' }
const authToken = 'abc123'
const timeoutMs = 5000
```

*Scope*: All code - use full words except approved whitelist


## Functions are ALWAYS camelCase. Components are ALWAYS PascalCase. Constants are ALWAYS SCREAMING_SNAKE_CASE. JSON keys are ALWAYS camelCase. No exceptions

- **Rule ID**: CASE_CONVENTIONS_001
- **Description**: Functions are ALWAYS camelCase. Components are ALWAYS PascalCase. Constants are ALWAYS SCREAMING_SNAKE_CASE. JSON keys are ALWAYS camelCase. No exceptions
- **Keywords**: casing, camelcase, pascalcase, screaming-snake-case, naming, conventions, consistency, readability
- **Rationale**: Consistent casing instantly identifies the type of identifier and reduces cognitive load. Mixed casing creates confusion about what's a function vs component vs constant. Visual consistency enables instant recognition.

**Prohibited:**
```ts
// ❌ PROHIBITED - Mixed/inconsistent casing:
const maxRetries = 3 // Should be SCREAMING_SNAKE_CASE
function ProcessData(data: string) { ... } // Should be camelCase
const usercard = () => <div>...</div> // Should be PascalCase
const json = { first_name: 'John' } // Should be camelCase
```

*Reasoning*: Inconsistent casing makes it unclear what type of identifier you're looking at

**Required:**
```ts
// ✅ REQUIRED - Consistent casing:

// Constants: SCREAMING_SNAKE_CASE
const MAX_RETRIES = 3
const API_TIMEOUT_MS = 5000
const DEFAULT_PAGE_SIZE = 10

// Functions: camelCase
function processData(data: string): string {
	return data.trim().toLowerCase()
}

function getUserInfo(id: string): User {
	return findUser(id)
}

// Components: PascalCase
function UserCard({ user }: Props) {
	return <div>{user.name}</div>
}

function NavigationMenu({ items }: Props) {
	return <nav>{items}</nav>
}

// JSON keys: camelCase
const user = {
	firstName: 'John',
	lastName: 'Doe',
	isActive: true,
	accountBalance: 1000
}
```

*Scope*: All code and data - no exceptions to casing rules


## Arrow function syntax OK in type signatures but prefer named type aliases: type Transform = (value: number) => number is better than inline (value: number) => number

- **Rule ID**: TYPE_ARROW_SYNTAX_001
- **Description**: Arrow function syntax OK in type signatures but prefer named type aliases: type Transform = (value: number) => number is better than inline (value: number) => number
- **Keywords**: typescript, types, arrow-functions, type-aliases, function-types, readability, reusability
- **Rationale**: Type signatures can use arrow syntax, but named aliases are clearer and more reusable. Naming can be tricky for function types. Inline function types are harder to read and not reusable. Natural language coding - even types should have meaningful names when possible.

**Prohibited:**
```ts
// ❌ PROHIBITED - Inline function types everywhere:
function process(
	fn: (a: number) => number,
	validator: (val: string) => boolean,
	mapper: (item: User) => ProcessedUser
): (data: Array<number>) => Array<ProcessedUser> {
	// Hard to read, not reusable
}
```

*Reasoning*: Inline function types reduce readability and prevent reuse

**Required:**
```ts
// ✅ REQUIRED - Named type aliases:

// Preferred: Named type aliases
type NumberTransform = (value: number) => number
type StringValidator = (value: string) => boolean
type UserMapper = (user: User) => ProcessedUser
type DataProcessor = (data: ReadonlyArray<number>) => ReadonlyArray<ProcessedUser>

function process(
	transform: NumberTransform,
	validator: StringValidator,
	mapper: UserMapper
): DataProcessor {
	// Clear, reusable types
}

// Acceptable: Inline when simple and used once
function map<T, U>(
	fn: (item: T) => U
): (items: ReadonlyArray<T>) => ReadonlyArray<U> {
	return function mapWithFn(items) {
		return items.map(fn)
	}
}
```

*Scope*: Type signatures - prefer named aliases for complex or reused function types


## Constants in SCREAMING_SNAKE_CASE, in constants/index.ts files, exported as named exports. Object keys within constants remain camelCase: COLORS.aquaBlue

- **Rule ID**: CONSTANTS_ORGANIZATION_001
- **Description**: Constants in SCREAMING_SNAKE_CASE, in constants/index.ts files, exported as named exports. Object keys within constants remain camelCase: COLORS.aquaBlue
- **Keywords**: constants, screaming-snake-case, organization, exports, naming, discoverability
- **Rationale**: SCREAMING_SNAKE_CASE makes constants unmistakable and centralized location aids discoverability. Mixed-case constants blend in with variables. Constants should be visually distinct and organizationally grouped. Object/map keys remain camelCase even within constants.

**Prohibited:**
```ts
// ❌ PROHIBITED - Lowercase constants scattered around:
const maxRetries = 3 // Looks like variable
const apiConfig = { base_url: '...' } // Snake_case keys

// In random files:
const timeout = 5000
const pageSize = 10
```

*Reasoning*: Lowercase constants blend with variables; scattered constants hard to find

**Required:**
```ts
// ✅ REQUIRED - SCREAMING_SNAKE_CASE in constants/index.ts:

// Path: src/constants/index.ts
export const MAX_RETRIES = 3
export const API_TIMEOUT_MS = 5000
export const DEFAULT_PAGE_SIZE = 10
export const ADDITIVE_IDENTITY = 0
export const MULTIPLICATIVE_IDENTITY = 1

// Object keys within constants remain camelCase:
export const API_CONFIG = {
	baseUrl: 'https://api.example.com',
	timeoutMs: 5000,
	retryAttempts: 3
}

export const COLORS = {
	primaryBlue: '#007bff',
	secondaryGreen: '#28a745',
	warningYellow: '#ffc107'
}

// Usage:
import { MAX_RETRIES, API_CONFIG, COLORS } from './constants'

if (attempts > MAX_RETRIES) { ... }
const url = API_CONFIG.baseUrl
const color = COLORS.primaryBlue
```

*Scope*: All constants - centralized in constants/index.ts with SCREAMING_SNAKE_CASE


## Initialisms and acronyms use Sentence case: innerHtml not innerHTML, AstNode not ASTNode, parseHtml not parseHTML, getApi not getAPI

- **Rule ID**: INITIALISM_CASE_001
- **Description**: Initialisms and acronyms use Sentence case: innerHtml not innerHTML, AstNode not ASTNode, parseHtml not parseHTML, getApi not getAPI
- **Keywords**: initialisms, acronyms, casing, sentence-case, naming, kebab-case, snake-case, consistency
- **Rationale**: Prevents garbage when converting cases: innerHtml → inner-html (clean) vs innerHTML → inner-h-t-m-l (garbage). All-caps initialisms create unreadable snake-case and kebab-case conversions. Visual consistency and clean case conversion.

**Prohibited:**
```ts
// ❌ PROHIBITED - All-caps initialisms:
const innerHTML = element.innerHTML
function parseXML(xml: string): ASTNode { ... }
function getAPI(): APIResponse { ... }
interface DOMElement { ... }

// Case conversion produces garbage:
// innerHTML → inner-h-t-m-l (kebab)
// parseXML → parse-x-m-l (kebab)
// getAPI → get-a-p-i (kebab)
```

*Reasoning*: All-caps initialisms create unreadable kebab-case and snake-case conversions

**Required:**
```ts
// ✅ REQUIRED - Sentence case for initialisms:
const innerHtml = element.innerHTML
function parseXml(xml: string): AstNode { ... }
function getApi(): ApiResponse { ... }
interface DomElement { ... }

// Clean case conversions:
// innerHtml → inner-html (clean)
// parseXml → parse-xml (clean)
// getApi → get-api (clean)

// More examples:
const htmlParser = new HtmlParser()
const jsonData = parseJson(raw)
const apiClient = new ApiClient()
const astTransform = transformAst(tree)
const domManipulation = updateDom(element)
```

*Scope*: All initialisms and acronyms - use sentence case throughout


## Use semantic Toolsmith functions instead of operators and methods: isEqual not ===, length(arr) not arr.length, isNotEmpty(arr) not arr.length > 0, not(condition) instead of !condition

- **Rule ID**: SEMANTIC_FUNCTIONS_001
- **Description**: Use semantic Toolsmith functions instead of operators and methods: isEqual not ===, length(arr) not arr.length, isNotEmpty(arr) not arr.length > 0, not(condition) instead of !condition
- **Keywords**: semantic-functions, operators, natural-language, readability, toolsmith, null-safety, self-documenting
- **Rationale**: Code reads like plain English. Toolsmith functions are null-safe and self-documenting. Operators like === and ! are cryptic and error-prone. Methods like arr.length create dependencies. Natural language coding - replace every operator with semantic equivalents.

**Prohibited:**
```ts
// ❌ PROHIBITED - Cryptic operators:
if (x === y) { ... }
if (x !== y) { ... }
if (x >= y) { ... }
if (!condition) { ... }
if (arr.length > 0) { ... }
const len = arr.length

// Problems:
// - === is cryptic
// - ! is easy to miss
// - arr.length fails on null/undefined
// - Not self-documenting
```

*Reasoning*: Operators are cryptic and error-prone; methods create null-safety issues

**Required:**
```ts
// ✅ REQUIRED - Semantic Toolsmith functions:
import {
	isEqual,
	isNotEqual,
	gte,
	lte,
	not,
	length,
	isEmpty,
	isNotEmpty
} from '@sitebender/toolsmith'

if (isEqual(x)(y)) { ... }           // Reads like English
if (isNotEqual(x)(y)) { ... }        // Clear intent
if (gte(x)(y)) { ... }               // x >= y
if (not(condition)) { ... }          // Explicit negation
if (isNotEmpty(arr)) { ... }         // Null-safe, clear
const len = length(arr)              // Null-safe

// Benefits:
// - Reads like natural language
// - Null-safe
// - Self-documenting
// - Composable
// - Searchable
```

*Scope*: All code - replace operators and methods with semantic Toolsmith functions


## Inner functions in curried functions should be named after what they CARRY (the enclosed value), not their parameter. Example: function add(augend) { return function addToAugend(addend) { return augend + addend } }

- **Rule ID**: FUNC_CLOSURE_NAMING_001
- **Description**: Inner functions in curried functions should be named after what they CARRY (the enclosed value), not their parameter. Example: function add(augend) { return function addToAugend(addend) { return augend + addend } }
- **Keywords**: currying, closures, naming, carried-values, readability, intent, functional-programming
- **Rationale**: The parameter is visible in the signature. The carried/enclosed value is hidden - naming it makes the closure's purpose clear. Generic names like 'addY' don't communicate what value is being carried in the closure. Natural language coding - function names should express intent and captured state.

**Prohibited:**
```ts
// ❌ PROHIBITED - Generic closure names:
function add(x: number) {
	return function addY(y: number): number {
		return x + y
	}
}

function multiply(a: number) {
	return function multiplyB(b: number): number {
		return a * b
	}
}

// What is x? What is 'Y'? Not clear.
```

*Reasoning*: Generic names don't communicate what value the closure carries

**Required:**
```ts
// ✅ REQUIRED - Name after carried value:

// Mathematical naming - augend is carried:
function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}

// Multiplicand is carried:
function multiply(multiplicand: number) {
	return function multiplyByMultiplicand(multiplier: number): number {
		return multiplicand * multiplier
	}
}

// Predicate is carried:
function filter<T>(predicate: (item: T) => boolean) {
	return function filterByPredicate(
		items: ReadonlyArray<T>
	): ReadonlyArray<T> {
		return items.filter(predicate)
	}
}

// Transform function is carried:
function map<T, U>(transform: (item: T) => U) {
	return function mapWithTransform(
		items: ReadonlyArray<T>
	): ReadonlyArray<U> {
		return items.map(transform)
	}
}
```

*Scope*: All curried functions - name inner functions after carried/enclosed values


## NEVER use arrow functions. Always use named function declarations with explicit blocks and return statements

- **Rule ID**: FUNC_DECLARATION_001
- **Description**: NEVER use arrow functions. Always use named function declarations with explicit blocks and return statements
- **Keywords**: arrow-functions, function-declarations, naming, explicit, stack-traces, debugging, readability
- **Rationale**: Named functions are traceable in stack traces. 'function' keyword is explicit. Forces explicit returns. Arrow functions create debugging nightmares and cognitive ambiguity. Natural language coding - functions should be named and explicit.

**Prohibited:**
```ts
// ❌ PROHIBITED - Arrow functions:
const add = (a, b) => a + b
const process = (data) => {
	const result = transform(data)
	return result
}

// Problems:
// - Anonymous in stack traces
// - Implicit returns can be confusing
// - Not as explicit as 'function' keyword
```

*Reasoning*: Arrow functions create anonymous stack traces and are less explicit

**Required:**
```ts
// ✅ REQUIRED - Named function declarations:
function add(augend: number) {
	return function addToAugend(addend: number): number {
		return augend + addend
	}
}

function process(data: Data): ProcessedData {
	const result = transform(data)
	return result
}

// Benefits:
// - Named in stack traces
// - Explicit return statements
// - Clear 'function' keyword
// - Hoisted for better organization

// Exception: Test files can use arrows but prefer named:
test('adds numbers', () => {
	// Acceptable in tests only
})

// Even better in tests:
test('adds numbers', function testAddsNumbers() {
	// Named for better stack traces
})
```

*Scope*: All code - no arrow functions except test files (but still prefer named)


## Types in PascalCase, in types/index.ts files, exported as named exports, imported with 'type' keyword

- **Rule ID**: TYPE_NAMING_001
- **Description**: Types in PascalCase, in types/index.ts files, exported as named exports, imported with 'type' keyword
- **Keywords**: typescript, types, pascalcase, type-imports, naming, organization, tree-shaking
- **Rationale**: PascalCase distinguishes types from values. 'type' import prevents runtime inclusion. Without 'type' keyword, types can bloat bundles. Clear distinction between types and runtime values.

**Prohibited:**
```ts
// ❌ PROHIBITED - Value imports and lowercase:
import { User, Product } from '../types/index.ts' // No 'type'

type user = { ... } // Should be PascalCase
type product = { ... } // Should be PascalCase
```

*Reasoning*: Value imports can bloat bundles; lowercase types blend with values

**Required:**
```ts
// ✅ REQUIRED - Type imports with PascalCase:

// Path: src/types/index.ts
export type User = {
	readonly id: string
	readonly name: string
	readonly email: string
}

export type Product = {
	readonly id: string
	readonly name: string
	readonly price: number
}

export type Result<T, E> =
	| { readonly _tag: 'success'; readonly value: T }
	| { readonly _tag: 'failure'; readonly error: E }

// Usage - import with 'type' keyword:
import type { User, Product, Result } from '../types/index.ts'

function getUser(id: string): Result<User, Error> {
	// ...
}

// Benefits:
// - Tree-shaking removes types from bundle
// - PascalCase distinguishes from values
// - Centralized type definitions
```

*Scope*: All TypeScript types - PascalCase, centralized, imported with 'type'


## Write happy path first: if (isNotEmpty(arr)) { process } return null - NOT if (isEmpty(arr)) { return null } process

- **Rule ID**: HAPPY_PATH_FIRST_001
- **Description**: Write happy path first: if (isNotEmpty(arr)) { process } return null - NOT if (isEmpty(arr)) { return null } process
- **Keywords**: happy-path, readability, control-flow, guard-clauses, intent, early-returns
- **Rationale**: Happy path should be the main branch, not buried in else clauses. Easier to understand the intended flow. Error-first code obscures the main purpose and creates nested logic. Natural language coding - lead with what you want to accomplish, not what might go wrong.

**Prohibited:**
```ts
// ❌ PROHIBITED - Error-first, nested logic:
function processData(arr: Array<number>): number | null {
	if (arr.length === 0) {
		return null
	} else {
		if (arr.length > 100) {
			return null
		} else {
			return arr.map(x => x * 2).reduce((a, b) => a + b, 0)
		}
	}
}
```

*Reasoning*: Happy path buried in nested else clauses makes intent unclear

**Required:**
```ts
// ✅ REQUIRED - Happy path first with guard clauses:
import { isNotEmpty, length, gte, pipe, map, reduce } from '@sitebender/toolsmith'

function processData(
	arr: ReadonlyArray<number>
): number | null {
	// Guard clauses first:
	if (isEmpty(arr)) return null
	if (gte(length(arr))(100)) return null
	
	// Happy path clearly visible:
	return pipe(
		arr,
		map(double),
		reduce(add)(ADDITIVE_IDENTITY)
	)
}

// Alternative with early return:
function processUser(data: unknown): User | null {
	// Guard: handle error case first
	if (!isValid(data)) return null
	
	// Happy path: main logic clearly visible
	return pipe(
		data,
		normalize,
		enrich,
		validate
	)
}
```

*Scope*: All functions - write guard clauses first, then happy path


## Extract operations for readability instead of inline: const multiplyBy7 = multiply(7); map(multiplyBy7)(numbers) - NOT map(n => n * 7)(array)

- **Rule ID**: EXTRACT_FOR_READABILITY_001
- **Description**: Extract operations for readability instead of inline: const multiplyBy7 = multiply(7); map(multiplyBy7)(numbers) - NOT map(n => n * 7)(array)
- **Keywords**: readability, extraction, naming, self-documenting, inline, clarity, natural-language
- **Rationale**: Named operations read like English. Inline operations require mental parsing. Inline operations create cognitive load and reduce code comprehension. Natural language coding - give every operation a meaningful name.

**Prohibited:**
```ts
// ❌ PROHIBITED - Inline anonymous operations:
const result = map(n => n * 7)([1, 2, 3, 4, 5])
const filtered = filter(x => x > 10)(numbers)
const users = map(u => ({ ...u, active: true }))(data)
```

*Reasoning*: Inline operations require mental parsing and aren't self-documenting

**Required:**
```ts
// ✅ REQUIRED - Extract and name operations:
import { map, filter, multiply } from '@sitebender/toolsmith'

// Extract operation and give it a name:
const multiplyBy7 = multiply(7)
const result = map(multiplyBy7)(numbers)

// Named predicate:
const isGreaterThan10 = gte(10)
const filtered = filter(isGreaterThan10)(numbers)

// Named transformation:
function markUserActive(user: Readonly<User>): Readonly<User> {
	return { ...user, active: true }
}
const activeUsers = map(markUserActive)(users)

// Reads like English:
const processedData = pipe(
	rawData,
	filter(isValid),
	map(normalize),
	map(enrich),
	filter(isComplete)
)
```

*Scope*: All code - extract and name operations instead of inline anonymous functions


## Component props are named 'Props', exported as named export, placed ABOVE the component

- **Rule ID**: COMPONENT_PROPS_001
- **Description**: Component props are named 'Props', exported as named export, placed ABOVE the component
- **Keywords**: components, props, jsx, tsx, naming, organization, visibility, typescript
- **Rationale**: Props are fundamental to components - deserve prime visibility. Generic name makes sense in context. Props buried below component are harder to find. Important things should be visible first.

**Prohibited:**
```ts
// ❌ PROHIBITED - Props below component or not exported:
export default function UserCard({ user, onEdit }: UserCardProps) {
	return <div>{user.name}</div>
}

// Props defined elsewhere or not exported
type UserCardProps = {
	user: User
	onEdit: (user: User) => void
}
```

*Reasoning*: Props below component reduce visibility; specific names add noise

**Required:**
```ts
// ✅ REQUIRED - Props named 'Props', exported, placed above:

// Props first - high visibility
export type Props = {
	readonly user: Readonly<User>
	readonly onEdit: (user: User) => void
}

// Component below
export default function UserCard({ user, onEdit }: Props) {
	return (
		<div>
			<h2>{user.name}</h2>
			<button onClick={() => onEdit(user)}>Edit</button>
		</div>
	)
}

// When importing, rename if needed:
import UserCard, {
	type Props as UserCardProps
} from './UserCard'

// Benefits:
// - Props immediately visible
// - Generic name clear in context
// - Exported for type checking
// - Consistent across all components
```

*Scope*: All JSX/TSX components - Props above component, named 'Props', exported


## Arrow functions OK in type signatures: (a: number) => number, but better to create named type aliases first: type NumberTransform = (value: number) => number

- **Rule ID**: ARROW_TYPES_CLARIFICATION_001
- **Description**: Arrow functions OK in type signatures: (a: number) => number, but better to create named type aliases first: type NumberTransform = (value: number) => number
- **Keywords**: typescript, type-signatures, arrow-functions, type-aliases, readability, reusability
- **Rationale**: Type signatures can use arrow syntax, but named aliases are clearer and more reusable. Inline function types are less readable than named type aliases. Natural language coding - give types meaningful names too.

**Prohibited:**
```ts
// ❌ PROHIBITED - Inline everywhere, hard to read:
function transform(
	fn: (a: number) => number,
	validate: (v: string) => boolean,
	process: (data: User) => ProcessedUser
): (items: Array<Data>) => Array<Result> {
	// Too many inline types
}
```

*Reasoning*: Inline function types everywhere reduces readability

**Required:**
```ts
// ✅ REQUIRED - Named type aliases preferred:

// Better: Create named aliases
type NumberTransform = (value: number) => number
type StringValidator = (value: string) => boolean  
type UserProcessor = (user: User) => ProcessedUser
type DataTransform = (
	items: ReadonlyArray<Data>
) => ReadonlyArray<Result>

function transform(
	transform: NumberTransform,
	validate: StringValidator,
	process: UserProcessor
): DataTransform {
	// Clear, reusable types
}

// Acceptable: Simple inline when used once
function map<T, U>(
	fn: (item: T) => U
): (items: ReadonlyArray<T>) => ReadonlyArray<U> {
	return function mapWithFn(items) {
		return items.map(fn)
	}
}
```

*Scope*: Type signatures - prefer named aliases for complex or reused types


## Names must be readable as natural language. Use complete words and phrases that clearly express intent. Code should read like plain English

- **Rule ID**: NATURAL_LANGUAGE_NAMING_001
- **Description**: Names must be readable as natural language. Use complete words and phrases that clearly express intent. Code should read like plain English
- **Keywords**: natural-language, naming, readability, self-documenting, intent, clarity, comprehension
- **Rationale**: Code is read far more often than written, so optimize for reader comprehension over writer convenience. Cryptic, overly terse, or clever names require mental translation and slow comprehension. Natural language coding - code should be self-documenting.

**Prohibited:**
```ts
// ❌ PROHIBITED - Cryptic, abbreviated names:
function calcUsrBal(u: Usr): number { ... }
function isUsrEmailVerif(u: Usr): boolean { ... }
function sndWelcEmail(u: Usr): void { ... }

const usrs = getUsrs()
const actv = usrs.filter(u => u.actv)
const bal = calcBal(actv)
```

*Reasoning*: Cryptic names require mental translation and reduce comprehension

**Required:**
```ts
// ✅ REQUIRED - Natural language, self-documenting:
function calculateUserAccountBalance(user: User): number {
	return pipe(
		user,
		getUserTransactions,
		map(getTransactionAmount),
		reduce(add)(ADDITIVE_IDENTITY)
	)
}

function isUserEmailAddressVerified(user: User): boolean {
	return pipe(
		user,
		getUserEmail,
		map(getEmailVerificationStatus),
		getOrElse(false)
	)
}

function sendWelcomeEmailToNewUser(user: User): Promise<void> {
	return pipe(
		user,
		generateWelcomeEmail,
		sendEmail
	)
}

// Reads like English:
const users = getAllUsers()
const activeUsers = filter(isUserActive)(users)
const totalBalance = pipe(
	activeUsers,
	map(calculateUserAccountBalance),
	reduce(add)(ADDITIVE_IDENTITY)
)
```

*Scope*: All names - functions, variables, types, constants - must read like English


## Generic constraints ensure type parameters meet specific requirements, providing compile-time safety while maintaining flexibility

- **Rule ID**: TS_GEN_014
- **Description**: Generic constraints ensure type parameters meet specific requirements, providing compile-time safety while maintaining flexibility
- **Keywords**: typescript, generics, constraints, type-safety, extends, compile-time, flexibility
- **Rationale**: Generic constraints ensure type parameters meet specific requirements, providing compile-time safety while maintaining flexibility. Unconstrained generics allow invalid type combinations and reduce type safety in generic functions. Use extends clauses to constrain type parameters.

**Prohibited:**
```ts
// ❌ PROHIBITED - Unconstrained generics:
function updateEntity<T>(entity: T, updates: Partial<T>): T {
	// No guarantee T has 'id' field
	return { ...entity, ...updates }
}

function processStringifiable<T>(value: T): string {
	// No guarantee T has toString()
	return value.toString()
}
```

*Reasoning*: Unconstrained generics allow invalid types that may not have required properties

**Required:**
```ts
// ✅ REQUIRED - Constrained generics:
type HasId = {
	readonly id: string
}

function updateEntity<T extends HasId>(
	entity: Readonly<T>
) {
	return function updateEntityWithEntity(
		updates: Readonly<Partial<Omit<T, 'id'>>>
	): Readonly<T> {
		return { ...entity, ...updates }
	}
}

function processStringifiable<T extends { toString(): string }>(
	value: T
) {
	return function processStringifiableValue(): string {
		return `Processed: ${value.toString()}`
	}
}

// Type-safe at compile time:
const user = { id: '123', name: 'John' }
const updated = updateEntity(user)({ name: 'Jane' }) // ✓
const invalid = updateEntity(user)({ id: '456' }) // ✗ Compile error
```

*Scope*: All generic functions - constrain type parameters when they need specific properties


## Proper function composition types enable type-safe pipeline operations and make complex transformations more readable and maintainable

- **Rule ID**: TS_FUN_012
- **Description**: Proper function composition types enable type-safe pipeline operations and make complex transformations more readable and maintainable
- **Keywords**: typescript, function-composition, types, currying, pipe, compose, type-safety
- **Rationale**: Proper function composition types enable type-safe pipeline operations and make complex transformations more readable and maintainable. Improper composition types lead to type errors and make it difficult to build reusable, composable functions. Design types to support currying, piping, and composition patterns.

**Prohibited:**
```ts
// ❌ PROHIBITED - Non-composable function types:
type Transform = (a: any, b: any) => any // Too loose

function process(
	fn1: (a: number, b: string) => number, // Not curried
	fn2: (x: string) => boolean
): void {
	// Can't compose easily
}
```

*Reasoning*: Non-curried, loosely-typed functions don't compose well

**Required:**
```ts
// ✅ REQUIRED - Composable function types:
type Unary<A, B> = (a: A) => B
type Binary<A, B, C> = (a: A) => (b: B) => C
type Ternary<A, B, C, D> = (a: A) => (b: B) => (c: C) => D

function pipe<A, B, C>(f: Unary<A, B>) {
	return function pipeWithF(g: Unary<B, C>): Unary<A, C> {
		return function pipedFunction(a: A): C {
			return g(f(a))
		}
	}
}

function compose<A, B, C>(g: Unary<B, C>) {
	return function composeWithG(f: Unary<A, B>): Unary<A, C> {
		return function composedFunction(a: A): C {
			return g(f(a))
		}
	}
}

// Type-safe composition:
const double: Unary<number, number> = (n) => n * 2
const toString: Unary<number, string> = (n) => String(n)
const length: Unary<string, number> = (s) => s.length

const transform = pipe(double)(pipe(toString)(length))
```

*Scope*: All function composition - use proper curried types for composability


## Readonly types enforce immutability at the type level, preventing accidental mutations and supporting functional programming patterns

- **Rule ID**: TS_IMM_004
- **Description**: Readonly types enforce immutability at the type level, preventing accidental mutations and supporting functional programming patterns
- **Keywords**: typescript, readonly, immutability, type-safety, mutations, functional-programming
- **Rationale**: Readonly types enforce immutability at the type level, preventing accidental mutations and supporting functional programming patterns. Mutable types allow accidental mutations that break immutability guarantees and cause hard-to-debug side effects. Use Readonly<T> and ReadonlyArray<T> to encode immutability constraints.

**Prohibited:**
```ts
// ❌ PROHIBITED - Mutable types:
function updateUser(
	user: User,
	updates: Partial<User>
): User {
	user.name = updates.name // Mutation allowed by type
	return user
}

function mapUsers(users: Array<User>): Array<ProcessedUser> {
	users.push(newUser) // Mutation allowed
	return users.map(processUser)
}
```

*Reasoning*: Mutable types allow accidental mutations that violate immutability principles

**Required:**
```ts
// ✅ REQUIRED - Readonly types:
function updateUser(
	user: Readonly<User>,
	updates: Readonly<Partial<User>>
): Readonly<User> {
	// Mutation prevented by types
	return { ...user, ...updates }
}

function mapUsers(
	users: ReadonlyArray<User>
): ReadonlyArray<ProcessedUser> {
	// users.push(newUser) // Compile error
	return users.map(processUser)
}

// Type definitions with readonly:
export type User = {
	readonly id: string
	readonly name: string
	readonly email: string
}

export type Config = {
	readonly apiUrl: string
	readonly timeout: number
	readonly retries: number
}
```

*Scope*: All types - use Readonly<T> and ReadonlyArray<T> to enforce immutability


## Smart constructors validate input and return Result types, ensuring branded types are always valid and providing clear error handling

- **Rule ID**: TS_BRT_009
- **Description**: Smart constructors validate input and return Result types, ensuring branded types are always valid and providing clear error handling
- **Keywords**: typescript, branded-types, smart-constructors, validation, result, type-safety
- **Rationale**: Smart constructors validate input and return Result types, ensuring branded types are always valid and providing clear error handling. Direct casting to branded types skips validation and allows invalid values to be treated as valid. Validate input and return Result<BrandedType, Error>.

**Prohibited:**
```ts
// ❌ PROHIBITED - Direct casting without validation:
type UserId = string & { readonly __brand: 'UserId' }

function userId(str: string): UserId {
	// No validation - any string becomes UserId
	return str as UserId
}

const id = userId('') // Empty string is valid UserId?
```

*Reasoning*: Direct casting skips validation and allows invalid values

**Required:**
```ts
// ✅ REQUIRED - Smart constructor with validation:
import type { Result, ValidationError } from '@sitebender/toolsmith/types'
import { isNotEmpty } from '@sitebender/toolsmith'

type UserId = string & { readonly __brand: 'UserId' }

function userId(
	str: string
): Result<UserId, ValidationError> {
	if (
		isNotEmpty(str) &&
		str.length <= 50 &&
		/^[a-zA-Z0-9_-]+$/.test(str)
	) {
		return success(str as UserId)
	}
	
	return failure({
		_tag: 'ValidationError',
		field: 'userId',
		message: 'UserId must be 1-50 alphanumeric characters'
	})
}

// Usage:
const result = userId('user_123')
match(result)(
	(id) => console.log('Valid:', id),
	(error) => console.error('Invalid:', error.message)
)
```

*Scope*: All branded types - use smart constructors that validate and return Result


## Type-level programming encodes constraints and relationships in the type system, providing compile-time guarantees and reducing runtime errors

- **Rule ID**: TS_ADV_005
- **Description**: Type-level programming encodes constraints and relationships in the type system, providing compile-time guarantees and reducing runtime errors
- **Keywords**: typescript, type-level-programming, mapped-types, conditional-types, template-literals, compile-time
- **Rationale**: Type-level programming encodes constraints and relationships in the type system, providing compile-time guarantees and reducing runtime errors. Runtime-only constraints allow invalid states to compile and fail at runtime, reducing system reliability. Leverage mapped types, conditional types, and template literals.

**Prohibited:**
```ts
// ❌ PROHIBITED - Runtime-only constraints:
type EventHandler = {
	eventName: string // Any string allowed
	callback: () => void
}

function handleEvent(handler: EventHandler) {
	// Runtime check needed
	if (!handler.eventName.startsWith('on')) {
		throw new Error('Event must start with "on"')
	}
}
```

*Reasoning*: Runtime checks allow invalid states to compile and fail at runtime

**Required:**
```ts
// ✅ REQUIRED - Type-level constraints:

// Non-empty array at type level:
type NonEmptyArray<T> = readonly [T, ...Array<T>]

function head<T>(arr: NonEmptyArray<T>): T {
	return arr[0] // Always safe - guaranteed non-empty
}

// Template literal types:
type EventName<T extends string> = `on${Capitalize<T>}`

type ClickEvent = EventName<'click'> // 'onClick'
type HoverEvent = EventName<'hover'> // 'onHover'

// Required keys computed at type level:
type RequiredKeys<T> = {
	[K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

type User = {
	id: string
	name?: string
	email?: string
}

type Required = RequiredKeys<User> // 'id'

// Conditional types:
type IsString<T> = T extends string ? true : false
type Test1 = IsString<'hello'> // true
type Test2 = IsString<number> // false
```

*Scope*: Complex type constraints - encode in type system when possible


## Unknown type requires explicit type checking before use, providing safety for truly unknown data while maintaining type system benefits. Use Toolsmith's Unknown type instead

- **Rule ID**: TS_UNK_008
- **Description**: Unknown type requires explicit type checking before use, providing safety for truly unknown data while maintaining type system benefits. Use Toolsmith's Unknown type instead
- **Keywords**: typescript, unknown, toolsmith, type-guards, validation, type-safety, primitivevalue, serializable
- **Rationale**: NEVER use TypeScript's built-in unknown type - use Toolsmith's PrimitiveValue, Serializable, Value, or Unknown types instead which provide better semantic meaning and type safety. Using any or skipping type validation on unknown data leads to runtime errors and eliminates type safety.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using TypeScript's unknown:
function processData(data: unknown): User {
	// Direct usage without type guard
	return data as User
}

function handleValue(value: unknown): string {
	// Using built-in unknown
	return String(value)
}
```

*Reasoning*: Built-in unknown type should never be used - use Toolsmith types

**Required:**
```ts
// ✅ REQUIRED - Use Toolsmith types:
import {
	type Value,
	type Serializable,
	type PrimitiveValue,
	type Unknown
} from '@sitebender/toolsmith'

function isUser(value: Value): value is User {
	return (
		typeof value === 'object' &&
		value !== null &&
		'id' in value &&
		'name' in value
	)
}

function processUnknownData(
	data: Unknown
): Result<User, ValidationError> {
	return isUser(data)
		? success(data)
		: failure({
				_tag: 'ValidationError',
				message: 'Not a valid user'
			})
}

function handlePrimitive(value: PrimitiveValue): string {
	return String(value)
}

function serializeData(data: Serializable): string {
	return JSON.stringify(data)
}
```

*Scope*: All TypeScript - use Toolsmith types (Value, Serializable, PrimitiveValue, Unknown)


## Discriminated unions provide type-safe variant types with exhaustive pattern matching, eliminating null/undefined errors and enabling robust error handling

- **Rule ID**: TS_ADT_001
- **Description**: Discriminated unions provide type-safe variant types with exhaustive pattern matching, eliminating null/undefined errors and enabling robust error handling
- **Keywords**: typescript, discriminated-unions, algebraic-data-types, pattern-matching, tag, variants, type-safety
- **Rationale**: Discriminated unions provide type-safe variant types with exhaustive pattern matching, eliminating null/undefined errors and enabling robust error handling. Using null/undefined or boolean flags leads to runtime errors, non-exhaustive handling, and loss of type safety. Use tagged unions with _tag field.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using null/undefined or booleans:
type Result = {
	value: any | null
	error: any | null
	isSuccess: boolean
}

function handleResult(result: Result): string {
	if (result.isSuccess) {
		return result.value // Could be null
	} else {
		return result.error // Could be null
	}
}
```

*Reasoning*: Null/undefined and boolean flags don't provide exhaustive checking

**Required:**
```ts
// ✅ REQUIRED - Discriminated unions with _tag:
type Result<T, E> =
	| { readonly _tag: 'success'; readonly value: T }
	| { readonly _tag: 'failure'; readonly error: E }

function handleResult<T, E>(
	result: Result<T, E>
): string {
	switch (result._tag) {
		case 'success':
			return `Success: ${result.value}`
		case 'failure':
			return `Error: ${result.error}`
	}
	// TypeScript ensures exhaustiveness
}

// Option/Maybe type:
type Option<T> =
	| { readonly _tag: 'some'; readonly value: T }
	| { readonly _tag: 'none' }

// Validation type:
type Validation<T, E> =
	| { readonly _tag: 'valid'; readonly value: T }
	| { readonly _tag: 'invalid'; readonly errors: ReadonlyArray<E> }
```

*Scope*: All variant types - use discriminated unions with _tag field


## Proper error type design with discriminated unions provides type-safe error handling without exceptions and clear error categorization

- **Rule ID**: TS_ERR_013
- **Description**: Proper error type design with discriminated unions provides type-safe error handling without exceptions and clear error categorization
- **Keywords**: typescript, error-handling, discriminated-unions, error-types, tag, categorization, type-safety
- **Rationale**: Proper error type design with discriminated unions provides type-safe error handling without exceptions and clear error categorization. Using exceptions or untyped errors leads to unhandled errors, unclear error contracts, and runtime crashes. Use discriminated unions for error types.

**Prohibited:**
```ts
// ❌ PROHIBITED - Throwing exceptions:
function validateUser(data: unknown): User {
	if (!data) {
		throw new Error('Invalid user')
	}
	if (!data.email) {
		throw new Error('Email required')
	}
	return data as User
}

// Loses type safety, unclear error types
```

*Reasoning*: Exceptions bypass type system and provide no error categorization

**Required:**
```ts
// ✅ REQUIRED - Discriminated union error types:
type ValidationError = {
	readonly _tag: 'ValidationError'
	readonly field: string
	readonly message: string
}

type NetworkError = {
	readonly _tag: 'NetworkError'
	readonly status: number
	readonly message: string
}

type DatabaseError = {
	readonly _tag: 'DatabaseError'
	readonly code: string
	readonly message: string
}

type AppError =
	| ValidationError
	| NetworkError
	| DatabaseError

function handleError(error: AppError): string {
	switch (error._tag) {
		case 'ValidationError':
			return `Validation failed for ${error.field}: ${error.message}`
		case 'NetworkError':
			return `Network error ${error.status}: ${error.message}`
		case 'DatabaseError':
			return `Database error ${error.code}: ${error.message}`
	}
}

function validateUser(
	data: unknown
): Result<User, ValidationError> {
	if (!data) {
		return failure({
			_tag: 'ValidationError',
			field: 'user',
			message: 'User data required'
		})
	}
	return success(data as User)
}
```

*Scope*: All error handling - use discriminated unions, never throw exceptions


## Array<T> syntax is more explicit and consistent with generic type patterns, improving readability especially for complex nested types

- **Rule ID**: TS_ARR_006
- **Description**: Array<T> syntax is more explicit and consistent with generic type patterns, improving readability especially for complex nested types
- **Keywords**: typescript, arrays, syntax, generics, readability, consistency, readonly
- **Rationale**: Array<T> syntax is more explicit and consistent with generic type patterns, improving readability especially for complex nested types. T[] syntax becomes unclear with complex types and doesn't consistently follow generic type conventions. Use Array<T> and ReadonlyArray<T>.

**Prohibited:**
```ts
// ❌ PROHIBITED - T[] syntax:
function processUsers(
	users: User[],
	processors: ((user: User) => ProcessedUser)[]
): ProcessedUser[] {
	// Hard to read with complex types
	return users.map(processors[0])
}

type Matrix = number[][] // Unclear nesting
```

*Reasoning*: T[] syntax is inconsistent with generic patterns and unclear with nesting

**Required:**
```ts
// ✅ REQUIRED - Array<T> syntax:
function processUsers(
	users: ReadonlyArray<User>,
	processors: ReadonlyArray<(user: User) => ProcessedUser>
): ReadonlyArray<ProcessedUser> {
	// Clear, consistent with generic patterns
	return users.map(processors[0])
}

type Matrix = Array<Array<number>> // Clear nesting
type NestedData = ReadonlyArray<ReadonlyArray<ReadonlyArray<string>>>

// Benefits:
// - Consistent with generic type syntax
// - Clear with complex nested types
// - Readonly variant matches pattern
// - More explicit and searchable
```

*Scope*: All array types - use Array<T> and ReadonlyArray<T>, never T[]


## Explicit type annotations provide clear contracts, improve code readability, and catch type errors early in development

- **Rule ID**: TS_TYP_003
- **Description**: Explicit type annotations provide clear contracts, improve code readability, and catch type errors early in development
- **Keywords**: typescript, type-annotations, explicit, contracts, readability, type-safety, parameters, returns
- **Rationale**: Explicit type annotations provide clear contracts, improve code readability, and catch type errors early in development. Relying on type inference for public APIs creates unclear contracts and makes refactoring dangerous. Always annotate function parameters and return types.

**Prohibited:**
```ts
// ❌ PROHIBITED - Missing type annotations:
function processUser(user, options) {
	// What types are these?
	return transform(user, options)
}

function calculateTotal(items) {
	// Return type inferred but unclear
	return items.reduce((sum, item) => sum + item.price, 0)
}
```

*Reasoning*: Missing annotations create unclear contracts and reduce type safety

**Required:**
```ts
// ✅ REQUIRED - Explicit type annotations:
function processUser(
	user: Readonly<User>,
	options: Readonly<ProcessOptions>
): Result<ProcessedUser, ProcessError> {
	return processUserWithOptions(user, options)
}

function calculateTotal(
	items: ReadonlyArray<Item>
): number {
	return reduce(
		(sum: number) => (item: Item) => sum + item.price
	)(ADDITIVE_IDENTITY)(items)
}

// Generic functions:
function map<T, U>(
	transform: (item: T) => U
): (items: ReadonlyArray<T>) => ReadonlyArray<U> {
	return function mapWithTransform(
		items: ReadonlyArray<T>
	): ReadonlyArray<U> {
		return items.map(transform)
	}
}

// Clear contracts, self-documenting
```

*Scope*: All functions - explicit type annotations for parameters and returns


## Unwrap functions provide a clear, named way to extract raw values from branded types for external APIs and serialization

- **Rule ID**: TS_BRT_011
- **Description**: Unwrap functions provide a clear, named way to extract raw values from branded types for external APIs and serialization
- **Keywords**: typescript, branded-types, unwrap, extraction, apis, serialization, explicit
- **Rationale**: Unwrap functions provide a clear, named way to extract raw values from branded types for external APIs and serialization. Direct casting makes it unclear when and why branded types are being converted back to raw values. Provide named unwrap functions to make extraction explicit and searchable.

**Prohibited:**
```ts
// ❌ PROHIBITED - Direct casting:
type UserId = string & { readonly __brand: 'UserId' }

const userId: UserId = 'user_123' as UserId

// Unclear extraction:
const response = await fetch(`/api/users/${userId as string}`)
const dbQuery = 'SELECT * FROM users WHERE id = ?'
const result = await db.query(dbQuery, [userId as string])
```

*Reasoning*: Direct casting makes extraction implicit and hard to track

**Required:**
```ts
// ✅ REQUIRED - Named unwrap function:
type UserId = string & { readonly __brand: 'UserId' }

function unwrapUserId(id: UserId): string {
	return id as string
}

// Clear, searchable extraction:
const userId: UserId = 'user_123' as UserId

// Passing to external API:
const response = await fetch(
	`/api/users/${unwrapUserId(userId)}`
)

// Database query:
const dbQuery = 'SELECT * FROM users WHERE id = ?'
const result = await db.query(
	dbQuery,
	[unwrapUserId(userId)]
)

// Serialization:
const json = JSON.stringify({
	id: unwrapUserId(userId),
	name: user.name
})

// Benefits:
// - Explicit extraction
// - Searchable
// - Documents intent
// - Can add logging/tracking
```

*Scope*: All branded types - provide unwrap functions for extracting raw values


## NEVER use TypeScript's built-in unknown type - use Toolsmith's PrimitiveValue, Serializable, Value, or Unknown types for better semantic meaning and type safety

- **Rule ID**: TS_TOOLSMITH_TYPES_001
- **Description**: NEVER use TypeScript's built-in unknown type - use Toolsmith's PrimitiveValue, Serializable, Value, or Unknown types for better semantic meaning and type safety
- **Keywords**: typescript, toolsmith, unknown, primitivevalue, serializable, value, type-safety, semantic
- **Rationale**: NEVER use TypeScript's built-in unknown type - use Toolsmith's PrimitiveValue, Serializable, Value, or Unknown types instead which provide better semantic meaning and type safety. Using unknown violates type safety principles and conflicts with our type system design. We know what our types are.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using TypeScript's unknown:
function processUnknownData(data: unknown): User {
	// PROHIBITED: Never use TypeScript's unknown type
	return data as User
}

function handleValue(value: unknown): string {
	// PROHIBITED: unknown type not allowed
	return String(value)
}
```

*Reasoning*: Built-in unknown type violates our type system design

**Required:**
```ts
// ✅ REQUIRED - Use Toolsmith types:
import {
	type Value,
	type Serializable,
	type PrimitiveValue,
	type Unknown
} from '@sitebender/toolsmith'

function isUser(value: Value): value is User {
	return (
		typeof value === 'object' &&
		value !== null &&
		'id' in value &&
		'name' in value
	)
}

function processUnknownData(
	data: Unknown
): Result<User, ValidationError> {
	return isUser(data)
		? success(data)
		: failure({
				_tag: 'ValidationError',
				message: 'Not a valid user'
			})
}

function handlePrimitive(value: PrimitiveValue): string {
	return String(value)
}

function serializeData(data: Serializable): string {
	return JSON.stringify(data)
}
```

*Scope*: All code - use Toolsmith types, NEVER TypeScript's unknown


## The any type completely disables TypeScript's type checking, eliminating the benefits of static typing and making code unsafe. Never use any

- **Rule ID**: TS_ANY_007
- **Description**: The any type completely disables TypeScript's type checking, eliminating the benefits of static typing and making code unsafe. Never use any
- **Keywords**: typescript, any, type-safety, prohibition, unknown, type-checking
- **Rationale**: The any type completely disables TypeScript's type checking, eliminating the benefits of static typing and making code unsafe. Using any allows runtime errors that TypeScript could prevent and eliminates intellisense and refactoring safety. Never use any; use Toolsmith types for truly unknown data.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using any:
function processData(data: any): any {
	// Type checking disabled
	return data.whatever.you.want
}

const result: any = fetchData()
result.nonExistent() // No type error
```

*Reasoning*: any disables type checking and eliminates TypeScript's benefits

**Required:**
```ts
// ✅ REQUIRED - Use proper types:
import { type Unknown, type Value } from '@sitebender/toolsmith'

function isApiResponse(value: Value): value is ApiResponse {
	return (
		typeof value === 'object' &&
		value !== null &&
		'data' in value
	)
}

function processApiResponse(
	response: Unknown
): Result<ProcessedData, ApiError> {
	if (isApiResponse(response)) {
		return success(processValidResponse(response))
	}
	
	return failure({
		_tag: 'ApiError',
		message: 'Invalid response'
	})
}

// Use proper type definitions:
type ApiResponse = {
	readonly data: unknown
	readonly status: number
}

// NEVER use any
```

*Scope*: All code - NEVER use any type


## Branded types prevent mixing semantically different values that share the same structural type, providing compile-time safety without runtime cost

- **Rule ID**: TS_BRT_002
- **Description**: Branded types prevent mixing semantically different values that share the same structural type, providing compile-time safety without runtime cost
- **Keywords**: typescript, branded-types, nominal-typing, brand, type-safety, domain-modeling, compile-time
- **Rationale**: Branded types prevent mixing semantically different values that share the same structural type, providing compile-time safety without runtime cost. Using raw primitives allows accidental mixing of different domain concepts, leading to semantic errors that pass type checking. Use intersection types with unique brands.

**Prohibited:**
```ts
// ❌ PROHIBITED - Raw primitives:
function getUser(id: string): User { ... }
function getPost(id: string): Post { ... }

const userId = 'user_123'
const postId = 'post_456'

// Semantic error compiles:
const user = getUser(postId) // Wrong ID type
const post = getPost(userId) // Wrong ID type
```

*Reasoning*: Raw primitives allow mixing semantically different values

**Required:**
```ts
// ✅ REQUIRED - Branded types:
type UserId = string & { readonly __brand: 'UserId' }
type PostId = string & { readonly __brand: 'PostId' }
type Email = string & { readonly __brand: 'Email' }

function getUser(id: UserId): User {
	return findUserById(id)
}

function getPost(id: PostId): Post {
	return findPostById(id)
}

// Type safety at compile time:
const userId: UserId = 'user_123' as UserId
const postId: PostId = 'post_456' as PostId

const user = getUser(userId) // ✓
const post = getPost(postId) // ✓

// Semantic errors caught:
const wrong1 = getUser(postId) // ✗ Compile error
const wrong2 = getPost(userId) // ✗ Compile error

// Zero runtime cost - brands erased after compilation
```

*Scope*: All domain primitives - use branded types for semantic distinction


## Nominal typing support through branded types and proper type design creates stronger type safety and clearer domain modeling

- **Rule ID**: TS_NOM_015
- **Description**: Nominal typing support through branded types and proper type design creates stronger type safety and clearer domain modeling
- **Keywords**: typescript, nominal-typing, branded-types, structural-typing, type-safety, domain-modeling
- **Rationale**: Nominal typing support through branded types and proper type design creates stronger type safety and clearer domain modeling. Relying only on structural typing allows semantically different types with same structure to be used interchangeably. Combine branded types, smart constructors, and proper abstractions.

**Prohibited:**
```ts
// ❌ PROHIBITED - Structural typing only:
type UserId = string
type PostId = string
type CommentId = string

function getUser(id: UserId): Promise<User> { ... }
function getPost(id: PostId): Promise<Post> { ... }
function getComment(id: CommentId): Promise<Comment> { ... }

// All IDs are interchangeable:
const userId = 'user_123'
const user = await getPost(userId) // Wrong but compiles
```

*Reasoning*: Structural typing allows semantically different types to be mixed

**Required:**
```ts
// ✅ REQUIRED - Nominal typing with brands:
type UserId = string & { readonly __brand: 'UserId' }
type PostId = string & { readonly __brand: 'PostId' }
type CommentId = string & { readonly __brand: 'CommentId' }

// Smart constructors:
function userId(str: string): Result<UserId, ValidationError> {
	return isValidId(str)
		? success(str as UserId)
		: failure({ _tag: 'ValidationError', message: 'Invalid user ID' })
}

function postId(str: string): Result<PostId, ValidationError> {
	return isValidId(str)
		? success(str as PostId)
		: failure({ _tag: 'ValidationError', message: 'Invalid post ID' })
}

// These are now nominally different despite same structure:
function getUser(id: UserId): Promise<User> { ... }
function getPost(id: PostId): Promise<Post> { ... }
function getComment(id: CommentId): Promise<Comment> { ... }

// Type safety:
const userIdResult = userId('user_123')
const postIdValue: PostId = 'post_456' as PostId

// Semantic errors caught:
const wrong = await getPost(userIdValue) // ✗ Compile error
```

*Scope*: All domain types - use nominal typing through branded types


## Always use type aliases, never use interface keyword. Interfaces are mutable, support declaration merging, and are designed for OOP patterns. Types are immutable, sealed, and align with functional programming

- **Rule ID**: TS_TYPE_INTERFACE_001
- **Description**: Always use type aliases, never use interface keyword. Interfaces are mutable, support declaration merging, and are designed for OOP patterns. Types are immutable, sealed, and align with functional programming
- **Keywords**: typescript, type, interface, immutability, functional-programming, type-aliases, sealed
- **Rationale**: Interfaces are mutable, support declaration merging, and are designed for OOP patterns. Types align with FP principles of immutability and sealed definitions. Using interface allows mutation, declaration merging creates hidden dependencies, and encourages OOP patterns that violate our functional architecture.

**Prohibited:**
```ts
// ❌ PROHIBITED - Using interface:
interface User {
	id: string
	name: string
}

interface ApiResponse<T> {
	data: T
	status: number
}

// Can be extended elsewhere (declaration merging):
interface User {
	email: string // Hidden extension
}
```

*Reasoning*: Interfaces support mutation and declaration merging, violating FP principles

**Required:**
```ts
// ✅ REQUIRED - Use type aliases:
type User = {
	readonly id: string
	readonly name: string
}

type ApiResponse<T> = {
	readonly data: T
	readonly status: number
}

// Sealed - cannot be extended:
// type User = { ... } // Error: duplicate

// Benefits:
// - Immutable by default with readonly
// - Sealed - no declaration merging
// - Aligns with FP principles
// - Consistent with functional architecture

// Exception: Only use interface with explicit
// artificer permission for specific interop requirements
```

*Scope*: All type definitions - use type, NEVER interface


## Unsafe constructors make the escape hatch explicit and should only be used for trusted data where validation already occurred. Prefix with 'unsafe'

- **Rule ID**: TS_BRT_010
- **Description**: Unsafe constructors make the escape hatch explicit and should only be used for trusted data where validation already occurred. Prefix with 'unsafe'
- **Keywords**: typescript, branded-types, unsafe, validation, escape-hatch, trusted-data
- **Rationale**: Unsafe constructors make the escape hatch explicit and should only be used for trusted data where validation already occurred. Implicit casting hides the fact that validation is being skipped, making it unclear when values might be invalid. Prefix with 'unsafe' to make validation bypass explicit.

**Prohibited:**
```ts
// ❌ PROHIBITED - Implicit casting:
type UserId = string & { readonly __brand: 'UserId' }

function createUserId(str: string): UserId {
	// Unclear if validation happened
	return str as UserId
}

// Usage unclear:
const id = createUserId(dbResult.id)
```

*Reasoning*: Implicit casting hides that validation is being skipped

**Required:**
```ts
// ✅ REQUIRED - Explicit unsafe constructor:
type UserId = string & { readonly __brand: 'UserId' }

// Unsafe constructor - explicit escape hatch:
function unsafeUserId(str: string): UserId {
	return str as UserId
}

// Usage - clear that validation is skipped:
// Reading from database where validation already occurred
const user = await db.query(
	'SELECT id FROM users WHERE id = ?',
	[validId]
)
const userId = unsafeUserId(user.id)
// Database constraint ensures validity

// Preferred: Use smart constructor when possible:
function userId(str: string): Result<UserId, ValidationError> {
	return isValidId(str)
		? success(str as UserId)
		: failure({ _tag: 'ValidationError', message: 'Invalid ID' })
}

// Use unsafe only for:
// - Database results with constraints
// - Already-validated external data
// - Performance-critical paths
// - Always document why
```

*Scope*: Branded types - provide unsafe constructors only when needed, always prefixed


