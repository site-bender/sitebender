import type { ArchitectError } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"

//++ Adds failed argument information to an error with index and optional name
export default function withFailedArg(index: number) {
	return function withArgumentName(name?: string) {
		return function enrichError<
			TOp extends string,
			TArgs extends ReadonlyArray<Value>,
		>(
			error: ArchitectError<TOp, TArgs>,
		): ArchitectError<TOp, TArgs> {
			return {
				...error,
				failedIndex: index,
				context: name
					? { ...(error.context ?? {}), argName: name }
					: error.context,
			}
		}
	}
}
