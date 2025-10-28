import type { Isbn } from "../../../types/Isbn/index.ts"

/*++
 + Brands value as Isbn without validation
 + USE ONLY when value is guaranteed to be valid (e.g., from trusted source)
 + Prefer the smart constructor for user input
 */
export default function unsafeIsbn(value: string): Isbn {
	return value as Isbn
}
