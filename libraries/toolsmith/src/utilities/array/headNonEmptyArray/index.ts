import type { NonEmptyArray } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Gets the first element from a NonEmptyArray safely
//++ Since NonEmptyArray is guaranteed to have at least one element, this never fails
export default function headNonEmptyArray<T>(value: NonEmptyArray<T>): T {
	return value[0]
}
