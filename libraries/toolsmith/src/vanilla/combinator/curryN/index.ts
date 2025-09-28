import type { Value } from "../../../types/index.ts"

import length from "../../array/length/index.ts"
import slice from "../../array/slice/index.ts"
import gte from "../../validation/gte/index.ts"

//++ Curries a function to exactly n arguments, limiting it to accept only the specified number of parameters
export default function curryN<TFunction extends (...args: Value[]) => Value>(
	arity: number,
) {
	return function curryNWithArity(targetFunction: TFunction) {
		return function curried(...args: Value[]): Value {
			if (gte(length(args))(arity)) {
				const slicedArgs = slice(0)(arity)(args)
				return targetFunction(...slicedArgs)
			}

			return function collectMoreArguments(...nextArgs: Value[]) {
				return curried(...args, ...nextArgs)
			}
		}
	}
}

//?? [EXAMPLE] max3(1)(2)(3) // 3
//?? [EXAMPLE] sum4(1)(2)(3)(4) // 10
//?? [EXAMPLE] curryN(2)(Math.pow)(2)(3) // 8
/*??
 | [EXAMPLE]
 | ```typescript
 | const max3 = curryN(3)(Math.max)
 | max3(1)(2)(3) // 3
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | const sum = (...nums: number[]) => nums.reduce((a, b) => a + b, 0)
 | const sum4 = curryN(4)(sum)
 | sum4(1)(2)(3)(4) // 10
 | ```
 |
 | [EXAMPLE]
 | ```typescript
 | curryN(2)(Math.pow)(2)(3) // 8
 | ```
 |
 | [GOTCHA]
 | Unlike regular curry, curryN limits functions to exactly n arguments.
 | Extra arguments beyond the specified arity are ignored.
 */
