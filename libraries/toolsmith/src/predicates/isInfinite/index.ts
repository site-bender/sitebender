import type { Value } from "../../types/index.ts"
import or from "../../logic/or/index.ts"
import isPositiveInfinity from "../isPositiveInfinity/index.ts"
import isNegativeInfinity from "../isNegativeInfinity/index.ts"

//++ Type guard that checks if a value is Infinity (positive or negative)
export default function isInfinite(value: Value): value is number {
	return or(isPositiveInfinity(value))(isNegativeInfinity(value))
}
