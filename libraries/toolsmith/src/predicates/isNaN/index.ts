import type { Value } from "../../types/index.ts"

//++ Type guard that checks if a value is the special NaN (Not-a-Number) value using Number.isNaN
export default function isNaN(value: Value): value is number {
	return Number.isNaN(value)
}
