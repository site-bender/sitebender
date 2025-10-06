import type { Integer } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an Integer branded type back to its underlying number value
export default function unwrapInteger(integer: Integer): number {
	return integer
}
