//++ Discriminated union type for validation that can accumulate errors
export interface Success<A> {
	readonly _tag: "Success"
	readonly value: A
}

export interface Failure<E> {
	readonly _tag: "Failure"
	readonly errors: readonly [E, ...Array<E>]
}

export type Validation<E, A> = Success<A> | Failure<E>

// Legacy aliases for backwards compatibility during transition
export type Valid<A> = Success<A>
export type Invalid<E> = Failure<E>
