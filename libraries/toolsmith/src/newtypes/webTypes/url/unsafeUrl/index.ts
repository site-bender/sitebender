import type { Url } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafely constructs a Url without validation
//++ Use only when the value is already known to be valid
//++ For validation, use the smart constructor url() instead
export default function unsafeUrl(value: string): Url {
	return value as Url
}
