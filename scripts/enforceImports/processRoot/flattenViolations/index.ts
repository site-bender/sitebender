import type { AliasViolation } from "../../../types/index.ts"

//++ Flattens an array of violations (identity function for flatMap)
export default function flattenViolations(
	violations: Array<AliasViolation>,
): Array<AliasViolation> {
	return violations
}
