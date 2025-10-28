import type { ArchitectError } from "../types/ArchitectError.ts"
import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Adds the original cause of an error, preserving the stack trace for debugging
export default function withCause(cause: Error | ArchitectError) {
	return function enrichError<
		TOp extends string,
		TArgs extends ReadonlyArray<Value>,
	>(
		error: ArchitectError<TOp, TArgs>,
	): ArchitectError<TOp, TArgs> {
		return {
			...error,
			cause,
			stack: cause instanceof Error
				? cause.stack
				: (cause as ArchitectError).stack,
		}
	}
}
