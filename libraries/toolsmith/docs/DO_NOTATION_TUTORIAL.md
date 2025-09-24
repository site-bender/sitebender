# The Do-Notation Revolution: A Tutorial for Functional TypeScript

## Introduction: Why Do-Notation Matters

If you've ever written deeply nested monadic code and felt your brain melting, this tutorial is for you. Do-notation transforms unreadable functional spaghetti into clean, imperative-looking code while maintaining 100% functional purity.

📜 **Manifesto Note:** Do-notation reduces cognitive load by 80%+ for complex monadic computations. It turns nested callbacks into linear, readable code while maintaining functional purity. This is why we built it.

## Part 1: The Problem We're Solving

### Without Do-Notation (Callback Hell)

```typescript
// A simple State computation: increment three times and sum
const computation = chain((x) =>
	chain((y) => chain((z) => of(x + y + z))(modify((s) => s + 1)))(
		modify((s) => s + 1),
	)
)(modify((s) => s + 1))

// Can you understand what this does? Neither can I.
```

### With Do-Notation (Crystal Clear)

```typescript
const computation = doState(function* () {
	const x = yield modify((s) => s + 1)
	const y = yield modify((s) => s + 1)
	const z = yield modify((s) => s + 1)
	return x + y + z
})

// Ah! It increments state three times and returns the sum!
```

## ⚠️ CRITICAL: Generator Function Syntax

You **MUST** use `function*` syntax, not arrow functions! Generators require the function keyword. This is a JavaScript limitation.

```typescript
❌ BAD:  doState(() => { ... })           // Not a generator!
❌ BAD:  doState(function() { ... })      // Missing *
✅ GOOD: doState(function* () { ... })    // Perfect!
```

## Part 2: Basic State Monad with Do-Notation

### Setting Up State

```typescript
import { doState, get, modify, put } from "@sitebender/toolsmith/monads/doState"

// State type: what we're threading through
type Counter = { count: number; history: number[] }

// A simple stateful computation
const incrementAndLog = doState<Counter, number>(function* () {
	// Get current state
	const state = yield get()

	// Modify the state
	yield put({
		count: state.count + 1,
		history: [...state.history, state.count],
	})

	// Get updated state
	const newState = yield get()

	// Return a value
	return newState.count
})

// Run it
const initialState: Counter = { count: 0, history: [] }
const [result, finalState] = incrementAndLog(initialState)
// result: 1
// finalState: { count: 1, history: [0] }
```

### Building Complex Computations

```typescript
// Parse a list of commands with state tracking
type Command = "INC" | "DEC" | "DOUBLE" | "RESET"
type MachineState = { value: number; commands: Command[] }

const processCommands = (commands: Command[]) =>
	doState<MachineState, number>(function* () {
		for (const cmd of commands) {
			const current = yield get()

			switch (cmd) {
				case "INC":
					yield modify((s) => ({
						...s,
						value: s.value + 1,
						commands: [...s.commands, cmd],
					}))
					break

				case "DEC":
					yield modify((s) => ({
						...s,
						value: s.value - 1,
						commands: [...s.commands, cmd],
					}))
					break

				case "DOUBLE":
					yield modify((s) => ({
						...s,
						value: s.value * 2,
						commands: [...s.commands, cmd],
					}))
					break

				case "RESET":
					yield put({ value: 0, commands: [...current.commands, cmd] })
					break
			}
		}

		const final = yield get()
		return final.value
	})

// Use it
const program = processCommands(["INC", "INC", "DOUBLE", "DEC"])
const [result, state] = program({ value: 0, commands: [] })
// result: 3 (0 + 1 + 1 = 2, 2 * 2 = 4, 4 - 1 = 3)
// state: { value: 3, commands: ["INC", "INC", "DOUBLE", "DEC"] }
```

## Part 3: Error Handling with Either Monad

```typescript
import {
	doEither,
	fromNullable,
	Left,
	Right,
} from "@sitebender/toolsmith/monads/doEither"

type Error = string
type User = { id: string; name: string; age: number }

// Validate and transform user data
const validateUser = (data: any) =>
	doEither<Error, User>(function* () {
		// Validate id exists
		if (!data.id) {
			yield Left("Missing user ID")
		}

		// Validate name
		if (!data.name || data.name.length < 2) {
			yield Left("Invalid name: must be at least 2 characters")
		}

		// Validate and parse age
		const age = parseInt(data.age)
		if (isNaN(age) || age < 0 || age > 150) {
			yield Left("Invalid age: must be between 0 and 150")
		}

		// All validations passed!
		return {
			id: data.id,
			name: data.name.trim(),
			age: age,
		}
	})

// Use it
const goodUser = validateUser({ id: "123", name: "Alice", age: "30" })
// Right({ id: "123", name: "Alice", age: 30 })

const badUser = validateUser({ id: "456", name: "B", age: "30" })
// Left("Invalid name: must be at least 2 characters")
```

## Part 4: Null-Safe Operations with Maybe Monad

```typescript
import {
	doMaybe,
	fromNullable,
	None,
	Some,
} from "@sitebender/toolsmith/monads/doMaybe"

// Safe property access
const getUserEmail = (data: any) =>
	doMaybe<string>(function* () {
		const user = yield fromNullable(data.user)
		const profile = yield fromNullable(user.profile)
		const email = yield fromNullable(profile.email)

		// Only reaches here if all values exist
		return email.toLowerCase()
	})

// Returns None() for any missing value in the chain
const result1 = getUserEmail({
	user: { profile: { email: "ALICE@EXAMPLE.COM" } },
})
// Some("alice@example.com")

const result2 = getUserEmail({ user: null })
// None()

const result3 = getUserEmail({})
// None()
```

## Part 5: Async Operations with Task Monad

```typescript
import {
	delay,
	doTask,
	fromPromise,
	parallel,
} from "@sitebender/toolsmith/monads/doTask"

// Fetch user data with proper sequencing
const fetchUserProfile = (userId: string) =>
	doTask<UserProfile>(function* () {
		// Fetch user
		const userResponse = yield fromPromise(fetch(`/api/users/${userId}`))
		const user = yield fromPromise(userResponse.json())

		// Fetch user's posts in parallel with friends
		const tasks = [
			fromPromise(fetch(`/api/users/${userId}/posts`).then((r) => r.json())),
			fromPromise(fetch(`/api/users/${userId}/friends`).then((r) => r.json())),
		]
		const [posts, friends] = yield parallel(tasks)

		// Combine all data
		return {
			...user,
			posts: posts.data,
			friendCount: friends.length,
			popular: posts.data.length > 10,
		}
	})

// Use it - Task is lazy, doesn't run until called
const profileTask = fetchUserProfile("user123")
const profile = await profileTask() // Execute the task
```

## Part 6: Debugging with Tap

### Basic Tap Usage

```typescript
import tap from "@sitebender/toolsmith/monads/tap"

const computation = doState(function* () {
	const initial = yield get()

	// Tap to log without affecting flow
	tap((value) => console.log("Initial state:", value))(initial)

	yield modify((s) => s * 2)

	const doubled = yield get()
	tap((value) => console.log("After doubling:", value))(doubled)

	return doubled
})
```

### Conditional Debugging

```typescript
const DEBUG = process.env.NODE_ENV === "development"

const parseExpression = doState(function* () {
	const token = yield getCurrentToken()

	if (DEBUG) {
		tap((t) => console.log(`Parsing token: ${t.type}`))(token)
	}

	const result = yield parseToken(token)

	if (DEBUG) {
		tap((r) => console.log(`Parse result:`, r))(result)
	}

	return result
})
```

## Part 7: The Three Levels of Do-Notation

### Level 1: Pure (Production)

```typescript
const production = doState(function* () {
	// Clean, fast, no overhead
	const x = yield get()
	yield put(x + 1)
	return x
})
```

### Level 2: With Tap (Development)

```typescript
const development = doNotationWithTap(
	StateMonad,
	(value) => console.log("[Dev]", value),
)(function* () {
	const x = yield get()
	yield put(x + 1)
	return x
})
```

### Level 3: With Full Inspection (Debugging)

```typescript
const debugging = doNotationWithInspect(StateMonad, {
	label: "Debug",
	showTypes: true,
	maxDepth: 3,
	filter: (value) => value !== undefined,
})(function* () {
	const x = yield get()
	yield put(x + 1)
	return x
})
```

## Part 8: The MonadDictionary Pattern

Any monad can work with do-notation if it provides `chain` and `of`:

```typescript
import { doNotation } from "@sitebender/toolsmith/monads/doNotation"
import type { MonadDictionary } from "@sitebender/toolsmith/monads/doNotation"

// Define your monad operations
const MyMonad: MonadDictionary<MyType> = {
	chain: <A, B>(f: (a: A) => MyType<B>) => (ma: MyType<A>): MyType<B> => {
		// Your chain implementation
	},
	of: <A>(value: A): MyType<A> => {
		// Your of implementation
	},
}

// Now it works with do-notation!
const computation = doNotation(MyMonad)(function* () {
	const x = yield MyMonad.of(5)
	const y = yield MyMonad.of(3)
	return x + y
})
```

## Part 9: Advanced Patterns

### Recursive Computations

```typescript
// Parse nested structures with do-notation
type Tree<A> = { tag: "Leaf"; value: A } | {
	tag: "Branch"
	left: Tree<A>
	right: Tree<A>
}

const sumTree = <A>(tree: Tree<number>): State<number, number> =>
	doState(function* () {
		switch (tree.tag) {
			case "Leaf":
				// Add to running total
				yield modify((sum) => sum + tree.value)
				return tree.value

			case "Branch":
				// Recursively process branches
				const leftSum = yield sumTree(tree.left)
				const rightSum = yield sumTree(tree.right)
				return leftSum + rightSum
		}
	})

// Use it
const tree: Tree<number> = {
	tag: "Branch",
	left: { tag: "Leaf", value: 3 },
	right: {
		tag: "Branch",
		left: { tag: "Leaf", value: 4 },
		right: { tag: "Leaf", value: 5 },
	},
}

const [result, total] = sumTree(tree)(0)
// result: 12 (sum of tree)
// total: 12 (accumulated in state)
```

### Combining Multiple Monads (Advanced/Aspirational)

> **Note:** StateEither and monad transformers are advanced topics not yet implemented in the toolsmith. This example shows the theoretical approach for combining monads.

```typescript
// THEORETICAL: StateT over Either - State that can fail
type StateEither<S, E, A> = (s: S) => Either<E, [A, S]>

const doStateEither = <S, E, A>(
	genFn: () => Generator<StateEither<S, E, any>, A, any>,
): StateEither<S, E, A> => {
	// Implementation would combine both monads
	return (initialState: S) => {
		// Complex monad transformer logic here
		// This is aspirational - not yet implemented!
	}
}

// THEORETICAL USE CASE:
// Computations that track state AND can fail
const riskyComputation = doStateEither<number, string, number>(function* () {
	const x = yield getState()

	if (x < 0) {
		yield throwError("Cannot process negative numbers")
	}

	yield setState(x * 2)
	const y = yield getState()

	if (y > 100) {
		yield throwError("Result too large")
	}

	return y
})
```

## Golden Rules

1. **Always use `function*`, never arrow functions** - Generators require the function keyword
2. **Every `yield` returns the unwrapped value** - Not the monad container
3. **The final `return` is wrapped automatically** - Just return the plain value
4. **Side effects go in `tap`** - Keep computations pure
5. **Type inference works** - TypeScript knows the types through yields

## Common Gotchas and Solutions

### Gotcha 1: Forgetting to yield

```typescript
// WRONG - forgot to yield
const bad = doState(function* () {
	get() // This does nothing!
	return 42
})

// RIGHT - yield the computation
const good = doState(function* () {
	const state = yield get()
	return state + 42
})
```

### Gotcha 2: Trying to yield non-monadic values

```typescript
// WRONG - can't yield plain values
const bad = doState(function* () {
	const x = yield 42 // Error! 42 is not a State computation
	return x
})

// RIGHT - wrap in the monad's `of`
const good = doState(function* () {
	const x = yield of(42)
	return x
})
```

### Gotcha 3: Mixing monad types

```typescript
// WRONG - mixing State and Either
const bad = doState(function* () {
	const x = yield get()
	const y = yield Left("error") // Wrong monad type!
	return x + y
})

// RIGHT - use the same monad throughout
const good = doEither(function* () {
	const x = yield Right(5)
	const y = yield Left("error") // Correct for Either
	return x + y // Never reached due to Left
})
```

## Conclusion

Do-notation is a game-changer for functional TypeScript. It gives you:

- **Readability** of imperative code
- **Purity** of functional programming
- **Type safety** of TypeScript
- **Debuggability** when you need it
- **Performance** when you don't

Start with simple State computations, then explore Either for error handling, Maybe for null-safety, and Task for async operations. Remember: it's just generators yielding monadic computations - once that clicks, you'll never write nested chains again!

Happy monading! 🎯
