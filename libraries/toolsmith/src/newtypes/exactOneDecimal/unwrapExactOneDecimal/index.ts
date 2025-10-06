import type { ExactOneDecimal } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an ExactOneDecimal back to a regular number for use with external APIs or serialization
export default function unwrapExactOneDecimal(value: ExactOneDecimal): number {
	return value as number
}
