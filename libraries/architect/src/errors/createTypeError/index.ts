import type { ArchitectError } from "../types/ArchitectError.ts"
import type { Datatype } from "../types/ArchitectError.ts"
import type { Value } from "@sitebender/toolsmith/types/index.ts"

import createError from "../createError/index.ts"

//++ Creates a type mismatch error with full context
export default function createTypeError<TOp extends string>(operation: TOp) {
	return function withArguments<TArgs extends ReadonlyArray<Value>>(
		args: TArgs,
	) {
		return function atArgumentIndex(argIndex: number) {
			return function expectingType<TDataType extends Datatype>(
				expected: TDataType,
			) {
				return function butGotType(
					actual: TDataType | "null" | "undefined" | "unknown",
				): ArchitectError<TOp, TArgs> {
					const baseError = createError(operation)(args)(
						`${operation}: Expected ${expected} at argument ${argIndex}, got ${actual}`,
					)("TYPE_MISMATCH") as ArchitectError<TOp, TArgs>

					return {
						...baseError,
						failedIndex: argIndex,
						suggestion: `Ensure argument ${argIndex} is of type ${expected}`,
						types: { expected, actual: (actual as unknown as Datatype) },
					}
				}
			}
		}
	}
}
