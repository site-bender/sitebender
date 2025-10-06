import type { ExactTwoDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an ExactTwoDecimals branded type back to its underlying number value
export default function unwrapExactTwoDecimals(value: ExactTwoDecimals): number {
	return value as number
}
