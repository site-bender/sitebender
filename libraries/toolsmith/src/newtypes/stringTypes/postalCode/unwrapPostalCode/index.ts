import type { PostalCode } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Extracts the underlying string value from a PostalCode
export default function unwrapPostalCode(postalCode: PostalCode): string {
	return postalCode
}
