import type NonEmptyArray from "../../../types/NonEmptyArray/index.ts"
import type { Invalid, Validation } from "../../../types/validation/index.ts"

//++ Creates a Failure validation containing errors
export default function failure<E, A = never>(
	errors: NonEmptyArray<E>,
): Validation<E, A> {
	return {
		_tag: "Failure" as const,
		errors,
	} as Invalid<E>
}
