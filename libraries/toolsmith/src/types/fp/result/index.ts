/**
 * Result type for error handling with explicit Ok/Error states
 * Independent of Either, with semantic naming for success/failure
 */

export interface Ok<T> {
	readonly _tag: "Ok"
	readonly value: T
}

export interface Error<E> {
	readonly _tag: "Error"
	readonly error: E
}

export type Result<E, T> = Ok<T> | Error<E>
