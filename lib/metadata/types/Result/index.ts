export type Result<T, E = string> = Success<T> | Failure<E>

export type Success<T> = {
	readonly success: true
	readonly data: T
}

export type Failure<E = string> = {
	readonly success: false
	readonly error: E
}

export function success<T>(data: T): Success<T> {
	return { success: true, data }
}

export function failure<E = string>(error: E): Failure<E> {
	return { success: false, error }
}

export function isSuccess<T, E>(result: Result<T, E>): result is Success<T> {
	return result.success
}

export function isFailure<T, E>(result: Result<T, E>): result is Failure<E> {
	return !result.success
}

export function map<T, U, E>(
	result: Result<T, E>,
	fn: (data: T) => U,
): Result<U, E> {
	return isSuccess(result) ? success(fn(result.data)) : result
}

export function flatMap<T, U, E>(
	result: Result<T, E>,
	fn: (data: T) => Result<U, E>,
): Result<U, E> {
	return isSuccess(result) ? fn(result.data) : result
}

export function getOrElse<T, E>(result: Result<T, E>, fallback: T): T {
	return isSuccess(result) ? result.data : fallback
}

export default {
	success,
	failure,
	isSuccess,
	isFailure,
	map,
	flatMap,
	getOrElse,
}
