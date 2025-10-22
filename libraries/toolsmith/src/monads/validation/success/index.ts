import type { Valid, Validation } from "../../../types/fp/validation/index.ts"

//++ Creates a Success validation representing a successful value
export default function success<A>(value: A): Validation<never, A> {
	return {
		_tag: "Success" as const,
		value,
	} as Valid<A>
}
