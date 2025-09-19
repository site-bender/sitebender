import or from "../../logic/or/index.ts"
import isPositiveInfinity from "../isPositiveInfinity/index.ts"
import isNegativeInfinity from "../isNegativeInfinity/index.ts"

//++ Type guard that checks if a value is infinite (positive or negative Infinity)
export default function isInfinite(value: unknown): value is number {
	return or(isPositiveInfinity(value))(isNegativeInfinity(value))
}

//?? [EXAMPLE] isInfinite(Infinity) // true
//?? [EXAMPLE] isInfinite(-Infinity) // true
//?? [EXAMPLE] isInfinite(42) // false
//?? [EXAMPLE] isInfinite(NaN) // false (NaN is not infinite)
//?? [EXAMPLE] isInfinite("string") // false
//?? [EXAMPLE] isInfinite(null) // false
/*??
 | [EXAMPLE]
 | const handleNumber = (value: unknown) => {
 |   if (isInfinite(value)) {
 |     return "Cannot process infinite values"
 |   }
 |   return value * 2
 | }
 |
 | handleNumber(42) // 84
 | handleNumber(Infinity) // "Cannot process infinite values"
 | handleNumber(-Infinity) // "Cannot process infinite values"
 */
