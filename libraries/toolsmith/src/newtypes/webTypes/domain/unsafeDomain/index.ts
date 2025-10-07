import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Domain without validation - use only when input is guaranteed valid
export default function unsafeDomain(value: string): Domain {
	return value as Domain
}
