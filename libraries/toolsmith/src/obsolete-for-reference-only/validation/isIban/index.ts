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
