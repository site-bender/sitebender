import type { AliasViolation } from "../../types/index.ts"

//++ Flattens an array of violation arrays (identity function for flatMap)
export default function flattenViolationArrays(
	violations: Array<AliasViolation>,
): Array<AliasViolation> {
	return violations
}
