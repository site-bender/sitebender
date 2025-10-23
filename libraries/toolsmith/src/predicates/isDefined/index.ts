import type { Value } from "../../types/index.ts"

//++ Type guard that checks if a value is defined (not undefined)
export default function isDefined<T extends Value = Value>(value?: T | null): value is T {
	return value !== undefined
}
