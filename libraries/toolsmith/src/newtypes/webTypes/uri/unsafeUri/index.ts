import type { Uri } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Uri without validation
//++ WARNING: Only use when you are certain the input is valid
export default function unsafeUri(value: string): Uri {
	return value as Uri
}
