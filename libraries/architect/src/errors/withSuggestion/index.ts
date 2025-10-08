import type { ArchitectError } from "../types/ArchitectError.ts"
import type { Value } from "@sitebender/toolsmith/types/index.ts"

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
