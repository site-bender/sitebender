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
