//++ Creates a successful Result (Right value in Either monad)
import type { Result } from "../../types/index.ts"

export default function Right<A>(value: A): Result<A, never> {
	return {
		ok: true,
		value,
	}
}
