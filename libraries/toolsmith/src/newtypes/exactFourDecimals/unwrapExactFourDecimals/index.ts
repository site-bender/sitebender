import type { ExactFourDecimals } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an ExactFourDecimals branded type back to its underlying number value
export default function unwrapExactFourDecimals(value: ExactFourDecimals): number {
	return value as number
}
