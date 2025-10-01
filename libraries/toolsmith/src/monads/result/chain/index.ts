import type { Result } from "../../../types/fp/result/index.ts"

import isOk from "../isOk/index.ts"

//++ Flat maps over the Ok value of a Result (monadic bind)
export default function chain<T, U, E>(fn: (value: T) => Result<E, U>) {
	return function chainWithFn(result: Result<E, T>): Result<E, U> {
		if (isOk(result)) {
			return fn(result.value)
		}
		return result
	}
}

// const safeDivide = (x: number) => x === 0
//   ? error("Division by zero")
//   : ok(10 / x)
//
// chain(safeDivide)(ok(2))  // ok(5)
// chain(safeDivide)(ok(0))  // error("Division by zero")
// chain(safeDivide)(error("previous"))  // error("previous")
