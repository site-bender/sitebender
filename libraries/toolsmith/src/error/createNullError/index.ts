import type { ArchitectError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

import createError from "../createError/index.ts"

//++ Creates a null/undefined input error with full context
export default function createNullError<TOp extends string>(operation: TOp) {
	return function withArguments<TArgs extends ReadonlyArray<Value>>(
		args: TArgs,
	) {
		return function atArgumentIndex(argIndex: number) {
			return function forArgumentNamed(
				argName: string,
			): ArchitectError<TOp, TArgs> {
				const baseError = createError(operation)(args)(
					`${operation}: Unexpected null/undefined for ${argName}`,
				)("NULL_VALUE") as ArchitectError<TOp, TArgs>

				return {
					...baseError,
					failedIndex: argIndex,
					suggestion:
						`Check that ${argName} is defined before calling ${operation}`,
				}
			}
		}
	}
}
