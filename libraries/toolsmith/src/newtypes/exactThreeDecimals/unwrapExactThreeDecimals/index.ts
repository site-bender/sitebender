import type { ExactThreeDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a ExactThreeDecimals back to a regular number for use with external APIs or serialization
export default function unwrapExactThreeDecimals(d: ExactThreeDecimals): number {
	return d as number
}
