import type { Url } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Extracts the raw string value from a Url
//++ Removes the type safety provided by the branded type
export default function unwrapUrl(value: Url): string {
	return value as string
}
