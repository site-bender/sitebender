import type { ArchitectError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

//++ Adds a helpful suggestion for fixing the error
export default function withSuggestion(suggestion: string) {
	return function enrichError<
		TOp extends string,
		TArgs extends ReadonlyArray<Value>,
	>(
		error: ArchitectError<TOp, TArgs>,
	): ArchitectError<TOp, TArgs> {
		return {
			...error,
			suggestion,
		}
	}
}
