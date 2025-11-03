//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
type IsbnOptions = {
	version?: 10 | 13
}

const isIsbn = (
	options: IsbnOptions = {},
): (value: unknown) => boolean => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		// Remove hyphens and spaces
		const cleanIsbn = value.replace(/[-\s]/g, "").toUpperCase()

		const { version } = options

		// Validate based on version preference
		if (version === 10) {
			return isValidIsbn10(cleanIsbn)
		}

		if (version === 13) {
			return isValidIsbn13(cleanIsbn)
		}

		// Default: accept both ISBN-10 and ISBN-13
		return isValidIsbn10(cleanIsbn) || isValidIsbn13(cleanIsbn)
	}
}

const isValidIsbn10 = (isbn: string): boolean => {
	// ISBN-10 must be exactly 10 characters
	if (isbn.length !== 10) {
		return false
	}

	// First 9 must be digits, 10th can be digit or X
	if (!/^\d{9}[\dX]$/.test(isbn)) {
		return false
	}

	// Calculate check digit
	const sum = isbn.substring(0, 9).split("").reduce(
		(acc, digit, i) => acc + parseInt(digit, 10) * (10 - i),
		0,
	)

	// Add check digit (X = 10)
	const checkChar = isbn[9]
	const checkValue = checkChar === "X" ? 10 : parseInt(checkChar, 10)
	const total = sum + checkValue

	return total % 11 === 0
}

const isValidIsbn13 = (isbn: string): boolean => {
	// ISBN-13 must be exactly 13 digits
	if (isbn.length !== 13) {
		return false
	}

	// All must be digits
	if (!/^\d{13}$/.test(isbn)) {
		return false
	}

	// Must start with 978 or 979
	if (!isbn.startsWith("978") && !isbn.startsWith("979")) {
		return false
	}

	// Calculate check digit
	const sum = isbn.substring(0, 12).split("").reduce(
		(acc, digit, i) => acc + parseInt(digit, 10) * (i % 2 === 0 ? 1 : 3),
		0,
	)

	const checkDigit = (10 - (sum % 10)) % 10
	return checkDigit === parseInt(isbn[12], 10)
}

export default isIsbn
