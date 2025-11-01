import type { NonEmptyString } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Extracts the underlying string value from a NonEmptyString
export default function unwrapNonEmptyString(nonEmptyString: NonEmptyString): string {
	return nonEmptyString
}
