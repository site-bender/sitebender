import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Failure, Validation } from "../../../types/fp/validation/index.ts"

//++ Creates a Failure validation containing errors
export default function failure<E, A = never>(
	errors: NonEmptyArray<E>,
): Validation<E, A> {
	return {
		_tag: "Failure" as const,
		errors,
	} as Failure<E>
}
