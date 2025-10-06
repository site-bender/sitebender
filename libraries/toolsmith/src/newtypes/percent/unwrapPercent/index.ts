import type { Percent } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Percent branded type back to its underlying number value
export default function unwrapPercent(value: Percent): number {
	return value as number
}
