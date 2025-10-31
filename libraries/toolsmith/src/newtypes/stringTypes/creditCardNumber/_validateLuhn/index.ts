import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"

//++ [EXCEPTION] Uses reduce and modulo operator for Luhn algorithm - pragmatic internal approach
//++ Validates credit card number using Luhn algorithm (mod 10 checksum)
export default function _validateLuhn(
	digits: string,
): Result<ValidationError, string> {
	const digitsArray = digits.split("").map(Number)

	//++ [EXCEPTION] Using reduce for checksum calculation
	const sum = digitsArray.reverse().reduce(
		function calculateLuhnSum(acc: number, digit: number, index: number): number {
			//++ [EXCEPTION] Using modulo operator for doubling check
			if (index % 2 === 1) {
				const doubled = digit * 2
				//++ [EXCEPTION] Using ternary and arithmetic operators
				return acc + (doubled > 9 ? doubled - 9 : doubled)
			}
			return acc + digit
		},
		0,
	)

	//++ [EXCEPTION] Using modulo operator for Luhn validation
	if (sum % 10 !== 0) {
		return error({
			code: "CREDIT_CARD_NUMBER_INVALID_CHECKSUM",
			field: "creditCardNumber",
			messages: ["The system detected an invalid credit card number (failed Luhn check)."],
			received: digits,
			expected: "Valid credit card number passing Luhn algorithm",
			suggestion: "Verify the credit card number digits are correct",
			severity: "requirement",
		})
	}

	return ok(digits)
}
