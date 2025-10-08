import type { ArchitectError } from "../types/ArchitectError.ts"
import type { ErrorCode } from "../types/ArchitectError.ts"
import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Creates a basic error object with minimal required fields
export default function createError<TOp extends string>(operation: TOp) {
	return function withArguments<TArgs extends ReadonlyArray<Value>>(
		args: TArgs,
	) {
		return function withMessage(message: string) {
			return function withErrorCode(
				code: ErrorCode = "OPERATION_FAILED",
			): ArchitectError<TOp, TArgs> {
				return {
					name: `${operation}Error` as `${TOp}Error`,
					operation,
					args,
					message,
					code,
					severity: "error",
				}
			}
		}
	}
}
