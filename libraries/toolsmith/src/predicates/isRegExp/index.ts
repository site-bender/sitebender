import type { Value } from "../../types/index.ts"

//++ Type guard that checks if a value is a RegExp object
export default function isRegExp(value: Value): value is RegExp {
	return value instanceof RegExp
}
