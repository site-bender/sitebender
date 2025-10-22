import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

import _getOperatorDescription from "./_getOperatorDescription/index.ts"
import _getRangeDescription from "./_getRangeDescription/index.ts"

type Inclusivity = "exclusive" | "minInclusive" | "maxInclusive" | "inclusive"

//++ Private helper that creates a ValidationError for range violations
export default function _createRangeError(min: number) {
	return function createRangeErrorWithMin(max: number) {
		return function createRangeErrorWithMinAndMax(received: Serializable) {
			return function createRangeErrorWithMinAndMaxAndReceived(
				inclusivity: Inclusivity,
			): ValidationError {
				const rangeDescription = _getRangeDescription(min)(max)(inclusivity)
				const operatorDescription = _getOperatorDescription(inclusivity)

				return {
					code: "VALUE_OUT_OF_RANGE",
					field: "value",
					messages: [
						`Value must be ${rangeDescription}`,
					],
					received,
					expected: `Number where ${operatorDescription}`,
					suggestion: "Provide a value within the valid range",
					constraints: { min, max },
					severity: "requirement",
				}
			}
		}
	}
}
