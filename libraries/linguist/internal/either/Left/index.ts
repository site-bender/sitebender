//++ Creates a failed Result (Left value in Either monad)
import type { Result } from "../../types/index.ts"

export default function Left<E>(error: E): Result<never, E> {
	return {
		ok: false,
		error,
	}
}

//?? [EXAMPLE] const result = Left("Error message")
//?? [EXAMPLE] result.ok // false
//?? [EXAMPLE] result.error // "Error message"
