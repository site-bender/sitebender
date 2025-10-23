import type { Anything } from "../../types/index.ts"

//++ Type guard that checks if a value is strictly null (not undefined or falsy)
export default function isNull(value: Anything): value is null {
	return value === null
}
