import type { Value } from "../../../types/index.ts"

import gte from "../../validation/gte/index.ts"
import length from "../../array/length/index.ts"
import slice from "../../array/slice/index.ts"

//++ Curries a function to exactly n arguments
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

//?? [EXAMPLE] const max3 = curryN(3)(Math.max); max3(1)(2)(3) // 3
//?? [EXAMPLE] const sum = (...nums: number[]) => nums.reduce((a, b) => a + b, 0); const sum4 = curryN(4)(sum); sum4(1)(2)(3)(4) // 10
//?? [EXAMPLE] curryN(2)(Math.pow)(2)(3) // 8
