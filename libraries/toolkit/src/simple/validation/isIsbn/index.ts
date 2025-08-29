/**
 * Validates International Standard Book Numbers (ISBN)
 *
 * Checks whether a string is a valid ISBN-10 or ISBN-13. Validates the
 * format and performs checksum verification according to ISBN standards.
 * Accepts ISBNs with or without hyphens and spaces. Returns false for
 * non-string values, empty strings, or invalid ISBNs.
 *
 * ISBN validation rules:
 * - ISBN-10: 10 digits, last can be X (represents 10)
 * - ISBN-13: 13 digits, starts with 978 or 979
 * - Validates check digit using modulo algorithm
 * - Ignores hyphens and spaces for validation
 * - Case-insensitive for X check digit
 *
 * @param options - Optional configuration to specify ISBN version
 * @returns A predicate function that validates ISBN codes
 * @example
 * ```typescript
 * // Basic validation (both ISBN-10 and ISBN-13)
 * const isValidIsbn = isIsbn()
 * isValidIsbn("0-306-40615-2")        // true (ISBN-10)
 * isValidIsbn("978-0-306-40615-7")    // true (ISBN-13)
 * isValidIsbn("123456789X")           // true (X check digit)
 * isValidIsbn("invalid")              // false
 *
 * // ISBN-10 only
 * const isbn10Only = isIsbn({ version: 10 })
 * isbn10Only("0-306-40615-2")         // true
 * isbn10Only("978-0-306-40615-7")     // false (ISBN-13)
 *
 * // ISBN-13 only
 * const isbn13Only = isIsbn({ version: 13 })
 * isbn13Only("978-0-306-40615-7")     // true
 * isbn13Only("0-306-40615-2")         // false (ISBN-10)
 *
 * // Various formats accepted
 * const validator = isIsbn()
 * validator("0 306 40615 2")          // true (spaces)
 * validator("0306406152")              // true (no separators)
 * validator("0-306-40615-2")          // true (hyphens)
 *
 * // Book catalog validation
 * const books = [
 *   { title: "Book 1", isbn: "978-0-306-40615-7" },
 *   { title: "Book 2", isbn: "invalid-isbn" },
 *   { title: "Book 3", isbn: "0-306-40615-2" }
 * ]
 * const validBooks = books.filter(book => isIsbn()(book.isbn))
 * // [Book 1, Book 3]
 * ```
 *
 * @pure
 * @curried
 * @predicate
 * @safe
 */
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
		0
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
		0
	)

	const checkDigit = (10 - (sum % 10)) % 10
	return checkDigit === parseInt(isbn[12], 10)
}

export default isIsbn