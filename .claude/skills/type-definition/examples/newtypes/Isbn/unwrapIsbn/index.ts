import type { Isbn } from "../../../types/Isbn/index.ts"

/*++
 + Extracts the underlying base type from a branded Isbn
 + Useful when interfacing with external APIs that expect primitives
 */
export default function unwrapIsbn(value: Isbn): string {
	return value as string
}
