import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"

//++ Checks if a hyphen exists at the specified position in a UUID
//++ Returns error if hyphen is missing, otherwise returns the accumulator
export default function _checkHyphen(uuid: string) {
	return function checkHyphenAtPosition(
		acc: Result<ValidationError, string>,
	) {
		return function withPosition(
			pos: number,
		): Result<ValidationError, string> {
			if (acc._tag === "Error") {
				return acc
			}

			if (uuid[pos] !== "-") {
				return error({
					code: "UUID_MISSING_HYPHEN",
					field: "uuid",
					messages: [
						`The system needs a hyphen at position ${pos + 1}.`,
					],
					received: uuid,
					expected: `Hyphen at position ${pos + 1}`,
					suggestion: `Expected '-' at position ${pos + 1}, found '${
						uuid[pos]
					}'`,
					severity: "requirement",
				})
			}

			return acc
		}
	}
}
