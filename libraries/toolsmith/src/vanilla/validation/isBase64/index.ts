import type { Value } from "../../../types/index.ts"

import length from "../../array/length/index.ts"
import defaultTo from "../../logic/defaultTo/index.ts"
import not from "../../logic/not/index.ts"
import or from "../../logic/or/index.ts"
import modulo from "../../math/modulo/index.ts"
import subtract from "../../math/subtract/index.ts"
import match from "../../string/match/index.ts"
import replace from "../../string/replace/index.ts"
import test from "../../string/test/index.ts"
import isEqual from "../isEqual/index.ts"
import isNull from "../isNull/index.ts"
import isString from "../isString/index.ts"
import isZero from "../isZero/index.ts"

type Base64Options = {
	urlSafe?: boolean // Allow URL-safe characters (- and _)
	allowUnpadded?: boolean // Allow Base64 without padding
	strict?: boolean // Require proper padding when applicable
}

//++ Validates if a string is properly Base64 encoded
export default function isBase64(options: Base64Options = {}) {
	return function isBase64WithOptions(
		value?: Value,
	): boolean {
		if (or(not(isString(value)))(isZero(length(value as string)))) {
			return false
		}

		const stringValue = value as string
		const urlSafe = defaultTo(false)(options.urlSafe)
		const allowUnpadded = defaultTo(false)(options.allowUnpadded)
		const strict = defaultTo(false)(options.strict)

		// Choose character set based on URL-safe option
		const chars = urlSafe
			? "A-Za-z0-9\\-_" // URL-safe Base64 uses - and _
			: "A-Za-z0-9\\+/" // Standard Base64 uses + and /

		// Build the regex pattern immutably
		const pattern = or(strict)(not(allowUnpadded))
			? `^(?:[${chars}]{4})*(?:[${chars}]{2}==|[${chars}]{3}=)?$` // Strict mode or padded
			: allowUnpadded
			? `^[${chars}]+={0,2}$` // Allow unpadded: any valid Base64 characters
			: `^(?:[${chars}]{4})*(?:[${chars}]{2}==|[${chars}]{3}=|[${chars}]{4})$` // Default: standard Base64

		const regex = new RegExp(pattern)

		// Test the pattern
		if (not(test(regex)(stringValue))) {
			return false
		}

		// Additional validation for strict mode
		if (strict) {
			const withoutEquals = replace(/=/g)("")(stringValue)
			const len = length(withoutEquals)
			const expectedPadding = modulo(subtract(4)(modulo(len)(4)))(4)
			const matches = match(/=+$/)(stringValue)
			const actualMatch = isNull(matches) ? "" : matches[0]
			const actualPadding = length(actualMatch)

			return isEqual(expectedPadding)(actualPadding)
		}

		return true
	}
}

//?? [EXAMPLE] isBase64({})("SGVsbG8gV29ybGQ=") // true
//?? [EXAMPLE] isBase64({})("YQ==") // true (single char)
//?? [EXAMPLE] isBase64({})("Hello World") // false (not encoded)
//?? [EXAMPLE] isBase64({})("") // false (empty)
//?? [EXAMPLE] isBase64({ urlSafe: true })("SGVsbG8tV29ybGQ") // true
/*??
 | [EXAMPLE]
 | const isStandardBase64 = isBase64({})
 | isStandardBase64("SGVsbG8gV29ybGQ=")  // true
 | isStandardBase64("YQ==")              // true
 | isStandardBase64("Hello World")       // false
 |
 | const isUrlSafeBase64 = isBase64({ urlSafe: true })
 | isUrlSafeBase64("SGVsbG8tV29ybGQ")  // true
 | isUrlSafeBase64("data-with_underscore")  // true
 |
 | const isStrictBase64 = isBase64({ strict: true })
 | isStrictBase64("SGVsbG8gV29ybGQ")   // false (needs padding)
 | isStrictBase64("SGVsbG8gV29ybGQ=")  // true (proper padding)
 |
 | [GOTCHA] Empty strings always return false
 | [GOTCHA] URL-safe and standard Base64 use different character sets
 */
