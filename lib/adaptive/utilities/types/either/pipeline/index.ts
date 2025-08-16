import type { Either } from "../index.ts"
import { isEither, isLeft, isRight, left, right, tryCatch } from "../index.ts"

/**
 * Pipe that automatically handles Either unwrapping and rewrapping
 * Short-circuits on first Left value
 * 
 * @example
 * ```typescript
 * const process = pipeEither(
 *   pathSafe("user.id"),
 *   map(id => id * 2),
 *   setSafe("doubledId")
 * )
 * 
 * process(userData) // Either<Error, Result>
 * ```
 */
export const pipeEither = <A>(...fns: Array<(a: any) => Either<any, any>>) => 
	(input: A | Either<any, A>): Either<any, any> => {
		const initial = isEither(input) ? input : right(input)
		
		return fns.reduce((acc, fn) => {
			if (isLeft(acc)) return acc
			return fn(acc.value)
		}, initial)
	}

/**
 * Pipe that works with mixed safe and unsafe functions
 * Automatically wraps unsafe returns in Either
 * Converts null/undefined to Left
 * 
 * @example
 * ```typescript
 * const process = pipeMixed(
 *   path("user.id"),        // unsafe, might return undefined
 *   x => x * 2,             // regular function
 *   setSafe("doubledId")    // safe, returns Either
 * )
 * 
 * process(userData) // Either<Error, Result>
 * ```
 */
export const pipeMixed = <A>(...fns: Array<(a: any) => any>) => 
	(input: A): Either<Error, any> => {
		try {
			let result: any = input
			
			for (const fn of fns) {
				// Handle Either results
				if (isEither(result)) {
					if (isLeft(result)) return result
					result = fn(result.value)
				} else {
					result = fn(result)
				}
				
				// Auto-wrap null/undefined as Left
				if (result == null && !isEither(result)) {
					return left(new Error(`Null or undefined result at step ${fn.name || 'anonymous'}`))
				}
			}
			
			// Ensure final result is Either
			return isEither(result) ? result : right(result)
		} catch (error) {
			return left(error instanceof Error ? error : new Error(String(error)))
		}
	}

/**
 * Railway-oriented programming style
 * Each function can return Either or regular value
 * Automatically handles the "track switching"
 * 
 * @example
 * ```typescript
 * const process = railway(
 *   getUser,           // might return Either<Error, User>
 *   validateAge,       // might return Either<Error, User>
 *   enrichProfile,     // regular function
 *   saveToDatabase    // might return Either<Error, Result>
 * )
 * 
 * // Looks like normal pipeline but handles all errors
 * const result = process(userId)
 * ```
 */
export const railway = <A, B>(...tracks: Array<(a: any) => any>) => 
	(input: A): B | Either<any, B> => {
		const result = tracks.reduce((acc, track) => {
			// If we're already on the error track, stay there
			if (isEither(acc) && isLeft(acc)) {
				return acc
			}
			
			// Extract value if in Either
			const value = isEither(acc) ? acc.value : acc
			
			// Run the track function
			const output = track(value)
			
			// Return as-is (Either or value)
			return output
		}, input as any)
		
		// Optionally unwrap successful result
		return isEither(result) && isRight(result) ? result.value : result
	}

/**
 * Compose functions that return Either
 * Right-to-left composition (like Ramda's compose)
 * 
 * @example
 * ```typescript
 * const process = composeEither(
 *   setSafe("result"),
 *   map(x => x * 2),
 *   pathSafe("value")
 * )
 * ```
 */
export const composeEither = <A>(...fns: Array<(a: any) => Either<any, any>>) => 
	(input: A | Either<any, A>): Either<any, any> => 
		pipeEither(...fns.reverse())(input)

/**
 * Do-notation style for working with Either
 * Makes monadic code look imperative
 * 
 * @example
 * ```typescript
 * const result = doEither(function* () {
 *   const user = yield getUserSafe(id)
 *   const profile = yield getProfileSafe(user.profileId)
 *   const enriched = yield enrichProfileSafe(profile)
 *   return enriched
 * })
 * ```
 */
export const doEither = <L, R>(
	generator: () => Generator<Either<L, any>, R, any>
): Either<L, R> => {
	const gen = generator()
	
	function step(value?: any): Either<L, R> {
		const { done, value: result } = gen.next(value)
		
		if (done) {
			// Generator returned, wrap in Right if not already Either
			return isEither(result) ? result : right(result as R)
		}
		
		// result is the yielded Either
		if (isLeft(result)) {
			return result
		}
		
		// Continue with the unwrapped value
		return step(result.value)
	}
	
	return step()
}

/**
 * Kleisli composition - compose functions that return Either
 * 
 * @example
 * ```typescript
 * const parseAndValidate = kleisli(
 *   parseJSON,      // (string) => Either<Error, any>
 *   validateUser    // (any) => Either<Error, User>
 * )
 * ```
 */
export const kleisli = <L, A, B, C>(
	f: (a: A) => Either<L, B>,
	g: (b: B) => Either<L, C>
) => (a: A): Either<L, C> => {
	const fb = f(a)
	return isLeft(fb) ? fb : g(fb.value)
}

/**
 * Kleisli composition for multiple functions
 */
export const kleisliN = <L>(...fns: Array<(a: any) => Either<L, any>>) =>
	fns.reduce((acc, fn) => {
		return (input: any) => {
			const result = acc(input)
			return isLeft(result) ? result : fn(result.value)
		}
	})

/**
 * Convert a regular function to one that returns Either
 * Catches exceptions and converts to Left
 * 
 * @example
 * ```typescript
 * const safeParse = eitherify(JSON.parse)
 * safeParse('{"valid": true}')  // Right<{valid: true}>
 * safeParse('invalid')          // Left<Error>
 * ```
 */
export const eitherify = <A extends Array<any>, R>(
	fn: (...args: A) => R,
	onError?: (error: unknown) => any
) => (...args: A): Either<any, R> =>
	tryCatch(
		() => fn(...args),
		onError || ((e) => e instanceof Error ? e : new Error(String(e)))
	)

/**
 * Convert an async function to one that returns Either
 * 
 * @example
 * ```typescript
 * const safeFetch = eitherifyAsync(fetch)
 * await safeFetch(url) // Either<Error, Response>
 * ```
 */
export const eitherifyAsync = <A extends Array<any>, R>(
	fn: (...args: A) => Promise<R>,
	onError?: (error: unknown) => any
) => async (...args: A): Promise<Either<any, R>> => {
	try {
		const result = await fn(...args)
		return right(result)
	} catch (error) {
		const err = onError 
			? onError(error)
			: error instanceof Error ? error : new Error(String(error))
		return left(err)
	}
}

/**
 * Tap into the pipeline for side effects without changing the value
 * Only runs if Either is Right
 * 
 * @example
 * ```typescript
 * pipeEither(
 *   pathSafe("user"),
 *   tap(user => console.log("Got user:", user)),
 *   map(user => user.id)
 * )
 * ```
 */
export const tap = <L, R>(
	fn: (value: R) => void
) => (either: Either<L, R>): Either<L, R> => {
	if (isRight(either)) {
		fn(either.value)
	}
	return either
}

/**
 * Tap for errors (Left values)
 * 
 * @example
 * ```typescript
 * pipeEither(
 *   pathSafe("user"),
 *   tapLeft(err => console.error("Failed:", err)),
 *   map(user => user.id)
 * )
 * ```
 */
export const tapLeft = <L, R>(
	fn: (error: L) => void
) => (either: Either<L, R>): Either<L, R> => {
	if (isLeft(either)) {
		fn(either.value)
	}
	return either
}

/**
 * Chain multiple Either-returning functions with automatic lifting
 * Regular functions are automatically wrapped in tryCatch
 * 
 * @example
 * ```typescript
 * const process = chain(
 *   getUserSafe,           // returns Either
 *   user => user.profile,  // regular function, auto-wrapped
 *   validateProfile       // returns Either
 * )
 * ```
 */
export const chain = <A>(...fns: Array<(a: any) => any>) =>
	(input: A): Either<Error, any> => {
		let current: Either<Error, any> = isEither(input) ? input : right(input)
		
		for (const fn of fns) {
			if (isLeft(current)) return current
			
			const result = fn(current.value)
			
			if (isEither(result)) {
				current = result
			} else if (result == null) {
				return left(new Error(`Null result from ${fn.name || 'function'}`))
			} else {
				current = right(result)
			}
		}
		
		return current
	}