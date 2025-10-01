import or from "../../logic/or/index.ts"
import isNegativeInfinity from "../isNegativeInfinity/index.ts"
import isPositiveInfinity from "../isPositiveInfinity/index.ts"

//++ Type guard that checks if a value is infinite (positive or negative Infinity)
export default function isInfinite(value: unknown): value is number {
	return or(isPositiveInfinity(value))(isNegativeInfinity(value))
}
