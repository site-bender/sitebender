import isEqual from "../isEqual/index.ts"

//++ Type guard that checks if a value is positive Infinity
export default function isPositiveInfinity(value: unknown): value is number {
	return isEqual(Infinity)(value)
}
