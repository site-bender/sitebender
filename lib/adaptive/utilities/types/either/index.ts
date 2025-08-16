/**
 * Either monad for functional error handling
 * 
 * Represents a value of one of two possible types (a disjoint union).
 * An Either is either a Left (typically representing failure) or a 
 * Right (typically representing success).
 * 
 * @example
 * ```typescript
 * // Creating Either values
 * const success = right(42)                    // Right<42>
 * const failure = left(new Error("Failed"))    // Left<Error>
 * 
 * // Chaining operations (only runs on Right)
 * right(5)
 *   .map(x => x * 2)         // Right<10>
 *   .flatMap(x => right(x + 1)) // Right<11>
 *   .fold(
 *     err => console.error(err),
 *     val => console.log(val)    // Logs: 11
 *   )
 * 
 * // Short-circuits on Left
 * left("error")
 *   .map(x => x * 2)         // Left<"error"> (not executed)
 *   .flatMap(x => right(x))  // Left<"error"> (not executed)
 *   .fold(
 *     err => console.error(err), // Logs: "error"
 *     val => console.log(val)
 *   )
 * ```
 */

/**
 * Left side of Either - typically represents failure
 */
export interface Left<L> {
	readonly _tag: "Left"
	readonly left: L
	readonly value: L
	
	isLeft(): true
	isRight(): false
	
	map<R>(fn: (r: never) => R): Left<L>
	flatMap<R>(fn: (r: never) => Either<L, R>): Left<L>
	fold<B>(onLeft: (l: L) => B, onRight: (r: never) => B): B
	getOrElse<R>(defaultValue: R): R
	orElse<L2, R>(fn: (l: L) => Either<L2, R>): Either<L2, R>
	
	toMaybe(): Nothing
	toArray(): Array<never>
	toString(): string
}

/**
 * Right side of Either - typically represents success
 */
export interface Right<R> {
	readonly _tag: "Right"
	readonly right: R
	readonly value: R
	
	isLeft(): false
	isRight(): true
	
	map<R2>(fn: (r: R) => R2): Right<R2>
	flatMap<L, R2>(fn: (r: R) => Either<L, R2>): Either<L, R2>
	fold<B>(onLeft: (l: never) => B, onRight: (r: R) => B): B
	getOrElse<R2>(defaultValue: R2): R
	orElse<L, R2>(fn: (l: never) => Either<L, R2>): Right<R>
	
	toMaybe(): Just<R>
	toArray(): Array<R>
	toString(): string
}

/**
 * Either type - represents a value that can be one of two types
 */
export type Either<L, R> = Left<L> | Right<R>

/**
 * Type guard to check if value is an Either
 */
export const isEither = <L, R>(value: unknown): value is Either<L, R> =>
	value != null &&
	typeof value === "object" &&
	"_tag" in value &&
	(value._tag === "Left" || value._tag === "Right")

/**
 * Type guard to check if Either is Left
 */
export const isLeft = <L, R>(either: Either<L, R>): either is Left<L> =>
	either._tag === "Left"

/**
 * Type guard to check if Either is Right
 */
export const isRight = <L, R>(either: Either<L, R>): either is Right<R> =>
	either._tag === "Right"

/**
 * Create a Left value
 */
export const left = <L, R = never>(value: L): Either<L, R> => ({
	_tag: "Left" as const,
	left: value,
	value,
	
	isLeft: () => true,
	isRight: () => false,
	
	map: () => left(value),
	flatMap: () => left(value),
	fold: (onLeft) => onLeft(value),
	getOrElse: (defaultValue) => defaultValue,
	orElse: (fn) => fn(value),
	
	toMaybe: () => nothing(),
	toArray: () => [],
	toString: () => `Left(${String(value)})`,
})

/**
 * Create a Right value
 */
export const right = <R, L = never>(value: R): Either<L, R> => ({
	_tag: "Right" as const,
	right: value,
	value,
	
	isLeft: () => false,
	isRight: () => true,
	
	map: (fn) => right(fn(value)),
	flatMap: (fn) => fn(value),
	fold: (_, onRight) => onRight(value),
	getOrElse: () => value,
	orElse: () => right(value),
	
	toMaybe: () => just(value),
	toArray: () => [value],
	toString: () => `Right(${String(value)})`,
})

/**
 * Create an Either from a nullable value
 */
export const fromNullable = <L, R>(
	onNull: () => L
) => (value: R | null | undefined): Either<L, R> =>
	value == null ? left(onNull()) : right(value)

/**
 * Create an Either from a predicate
 */
export const fromPredicate = <L, R>(
	predicate: (r: R) => boolean,
	onFalse: (r: R) => L
) => (value: R): Either<L, R> =>
	predicate(value) ? right(value) : left(onFalse(value))

/**
 * Try to execute a function and return Either
 */
export const tryCatch = <L, R>(
	fn: () => R,
	onError: (error: unknown) => L
): Either<L, R> => {
	try {
		return right(fn())
	} catch (error) {
		return left(onError(error))
	}
}

/**
 * Try to execute an async function and return Either
 */
export const tryCatchAsync = async <L, R>(
	fn: () => Promise<R>,
	onError: (error: unknown) => L
): Promise<Either<L, R>> => {
	try {
		const result = await fn()
		return right(result)
	} catch (error) {
		return left(onError(error))
	}
}

/**
 * Sequence an array of Either values
 * Returns Right with array of values if all are Right
 * Returns first Left if any are Left
 */
export const sequence = <L, R>(
	eithers: Array<Either<L, R>>
): Either<L, Array<R>> => {
	const results: Array<R> = []
	
	for (const either of eithers) {
		if (isLeft(either)) {
			return either
		}
		results.push(either.right)
	}
	
	return right(results)
}

/**
 * Traverse an array with a function that returns Either
 * Short-circuits on first Left
 */
export const traverse = <L, A, B>(
	fn: (a: A) => Either<L, B>
) => (array: Array<A>): Either<L, Array<B>> => {
	const results: Array<B> = []
	
	for (const item of array) {
		const either = fn(item)
		if (isLeft(either)) {
			return either
		}
		results.push(either.right)
	}
	
	return right(results)
}

// Maybe type integration (for toMaybe methods)
interface Nothing {
	readonly _tag: "Nothing"
	readonly value: undefined
}

interface Just<A> {
	readonly _tag: "Just"
	readonly value: A
}

type Maybe<A> = Nothing | Just<A>

const nothing = (): Nothing => ({
	_tag: "Nothing",
	value: undefined,
})

const just = <A>(value: A): Just<A> => ({
	_tag: "Just",
	value,
})

/**
 * Map over Either, but only if it's Right
 */
export const map = <L, R, R2>(
	fn: (r: R) => R2
) => (either: Either<L, R>): Either<L, R2> =>
	isRight(either) ? right(fn(either.right)) : either

/**
 * FlatMap over Either (also known as chain or bind)
 */
export const flatMap = <L, R, R2>(
	fn: (r: R) => Either<L, R2>
) => (either: Either<L, R>): Either<L, R2> =>
	isRight(either) ? fn(either.right) : either

/**
 * Apply a function in Either context
 */
export const ap = <L, A, B>(
	fnEither: Either<L, (a: A) => B>
) => (either: Either<L, A>): Either<L, B> =>
	isRight(fnEither) && isRight(either)
		? right(fnEither.right(either.right))
		: isLeft(fnEither)
		? fnEither
		: either as Either<L, B>

/**
 * Lift a regular function to work with Either values
 */
export const lift = <L, A, B>(
	fn: (a: A) => B
) => (either: Either<L, A>): Either<L, B> =>
	map(fn)(either)

/**
 * Lift a binary function to work with Either values
 */
export const lift2 = <L, A, B, C>(
	fn: (a: A, b: B) => C
) => (eitherA: Either<L, A>) => (eitherB: Either<L, B>): Either<L, C> =>
	isRight(eitherA) && isRight(eitherB)
		? right(fn(eitherA.right, eitherB.right))
		: isLeft(eitherA)
		? eitherA
		: eitherB as Either<L, C>

/**
 * Get the value from Either or throw
 */
export const unsafeUnwrap = <L, R>(either: Either<L, R>): R => {
	if (isLeft(either)) {
		throw new Error(`Cannot unwrap Left: ${either.left}`)
	}
	return either.right
}

/**
 * Get the value from Either or return default
 */
export const getOrElse = <R>(defaultValue: R) => <L>(
	either: Either<L, R>
): R =>
	isRight(either) ? either.right : defaultValue

/**
 * Fold an Either into a single value
 */
export const fold = <L, R, B>(
	onLeft: (l: L) => B,
	onRight: (r: R) => B
) => (either: Either<L, R>): B =>
	isLeft(either) ? onLeft(either.left) : onRight(either.right)