import type { NonEmptyArray } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Gets the first element from a NonEmptyArray safely
//++ Since NonEmptyArray is guaranteed to have at least one element, this never fails
export default function headNonEmptyArray<T>(value: NonEmptyArray<T>): T {
	//++ [EXCEPTION] Array indexing [0] permitted in Toolsmith for performance - provides safe head access for NonEmptyArray
	return value[0]
}
