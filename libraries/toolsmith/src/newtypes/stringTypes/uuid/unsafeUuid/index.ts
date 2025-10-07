import type { Uuid } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor that brands a string as Uuid without validation - use only when input is guaranteed valid
export default function unsafeUuid(value: string): Uuid {
	return value as Uuid
}
