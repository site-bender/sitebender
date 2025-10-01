import type { ArchitectError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

import pipeError from "../pipeError/index.ts"
import withCause from "../withCause/index.ts"

//++ Converts a caught exception into an ArchitectError, preserving the original error as the cause
export default function fromException<TOp extends string>(operation: TOp) {
	return function withArguments<TArgs extends ReadonlyArray<Value>>(
		args: TArgs,
	) {
		return function withException(
			exception: unknown,
		): ArchitectError<TOp, TArgs> {
			const err = exception instanceof Error
				? exception
				: new Error(String(exception))

			return pipeError(operation)(args)(
				`${operation} threw an exception: ${err.message}`,
			)(
				function setExceptionCode(error) {
					return { ...error, code: "EXCEPTION_THROWN" } as typeof error
				},
				withCause(err),
			)
		}
	}
}
