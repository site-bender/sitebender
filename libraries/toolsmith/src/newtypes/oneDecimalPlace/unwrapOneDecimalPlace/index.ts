import type { OneDecimalPlace } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps an OneDecimalPlace back to a regular number for use with external APIs or serialization
export default function unwrapOneDecimalPlace(value: OneDecimalPlace): number {
	return value as number
}
