import type { Either } from "../../../types/fp/either/index.ts"

import fold from "../fold/index.ts"

//++ Alias of fold with more intention-revealing parameter names
export default function either<E, A, B>(leftHandler: (e: E) => B) {
	return function eitherRight(rightHandler: (a: A) => B) {
		return function eitherValue(either: Either<E, A>): B {
			return fold<E, A, B>(leftHandler)(rightHandler)(either)
		}
	}
}
