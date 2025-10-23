import type { Anything } from "../../types/index.ts"

//++ Type guard that checks if a value is strictly undefined (not null or falsy)
export default function isUndefined(value: Anything): value is undefined{
	return value === undefined
}
