//++ Discriminated union type for validation that can accumulate errors
export interface Valid<A> {
	readonly _tag: "Valid"
	readonly value: A
}

export interface Invalid<E> {
	readonly _tag: "Invalid"
	readonly errors: readonly [E, ...Array<E>]
}

export type Validation<E, A> = Valid<A> | Invalid<E>
