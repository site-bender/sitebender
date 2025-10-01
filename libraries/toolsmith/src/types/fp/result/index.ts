//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

export interface Ok<T> {
	readonly _tag: "Ok"
	readonly value: T
}

export interface Error<E> {
	readonly _tag: "Error"
	readonly error: E
}

export type Result<E, T> = Ok<T> | Error<E>
