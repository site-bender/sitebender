import isEqual from "../isEqual/index.ts"

//++ Type guard that checks if a value is negative Infinity
export default function isNegativeInfinity(value: unknown): value is number {
	return isEqual(-Infinity)(value)
}
