import type NonEmptyArray from "../../types/NonEmptyArray/index.ts"
import type ValidationError from "../../types/ValidationError/index.ts"

import combineErrors from "./combineErrors/index.ts"

//++ Validation monad that accumulates errors instead of short-circuiting like Result
export default abstract class Validation<T> {
	abstract isValid(): this is Valid<T>
	abstract isInvalid(): this is Invalid<T>

	static of<T>(value: T): Validation<T> {
		return new Valid(value)
	}

	static invalid<T>(errors: NonEmptyArray<ValidationError>): Validation<T> {
		return new Invalid(errors)
	}

	abstract validate<U>(
		fn: (value: T) => Validation<U>,
	): Validation<U>

	abstract map<U>(fn: (value: T) => U): Validation<U>

	abstract fold<U>(
		onValid: (value: T) => U,
		onInvalid: (errors: NonEmptyArray<ValidationError>) => U,
	): U
}

export class Valid<T> extends Validation<T> {
	constructor(public readonly value: T) {
		super()
	}

	isValid(): this is Valid<T> {
		return true
	}

	isInvalid(): this is Invalid<T> {
		return false
	}

	validate<U>(fn: (value: T) => Validation<U>): Validation<U> {
		return fn(this.value)
	}

	map<U>(fn: (value: T) => U): Validation<U> {
		return new Valid(fn(this.value))
	}

	fold<U>(
		onValid: (value: T) => U,
		_onInvalid: (errors: NonEmptyArray<ValidationError>) => U,
	): U {
		return onValid(this.value)
	}
}

export class Invalid<T> extends Validation<T> {
	constructor(public readonly errors: NonEmptyArray<ValidationError>) {
		super()
	}

	isValid(): this is Valid<T> {
		return false
	}

	isInvalid(): this is Invalid<T> {
		return true
	}

	validate<U>(_fn: (value: T) => Validation<U>): Validation<U> {
		return new Invalid(this.errors)
	}

	map<U>(_fn: (value: T) => U): Validation<U> {
		return new Invalid(this.errors)
	}

	fold<U>(
		_onValid: (value: T) => U,
		onInvalid: (errors: NonEmptyArray<ValidationError>) => U,
	): U {
		return onInvalid(this.errors)
	}
}