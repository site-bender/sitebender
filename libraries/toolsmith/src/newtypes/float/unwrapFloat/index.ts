import type { Float } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Float branded type back to its underlying number value
export default function unwrapFloat(float: Float): number {
	return float
}
