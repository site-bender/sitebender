import not from "../../logic/not/index.ts"
import test from "../../string/test/index.ts"
import ibanLengths from "./ibanLengths/index.ts"
import validateMod97 from "./validateMod97/index.ts"

//++ Validates International Bank Account Numbers (IBAN) per ISO 13616
export default function isIban(value: unknown) {
	const IBAN_FORMAT = /^[A-Z]{2}\d{2}[A-Z0-9]+$/

	return function checkIban(): boolean {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		// Remove spaces and convert to uppercase
		const iban = value.replace(/\s/g, "").toUpperCase()

		// Basic format check: 2 letters, 2 digits, then alphanumeric
		if (not(test(IBAN_FORMAT)(iban))) {
			return false
		}

		const countryCode = iban.substring(0, 2)
		const expectedLength = ibanLengths()[countryCode]

		// Check if country code is valid and length matches
		if (not(expectedLength) || iban.length !== expectedLength) {
			return false
		}

		// Perform mod-97 checksum validation
		return validateMod97(iban)
	}
}

//?? [EXAMPLE] isIban("GB82 WEST 1234 5698 7654 32")() // true
//?? [EXAMPLE] isIban("DE89 3704 0044 0532 0130 00")() // true
//?? [EXAMPLE] isIban("INVALID")() // false
//?? [EXAMPLE] isIban(null)() // false
/*??
 | [EXAMPLE] Case insensitive validation
 | isIban("gb82 west 1234 5698 7654 32")() // true
 |
 | [EXAMPLE] Different country formats
 | isIban("CH93 0076 2011 6238 5295 7")() // true (Switzerland)
 | isIban("NO93 8601 1117 947")() // true (Norway - 15 chars)
 |
 | [GOTCHA] Spaces are ignored for validation
 | [GOTCHA] Country code must be valid ISO code with correct length
 | [PRO] Performs full mod-97 checksum validation
 |
*/
