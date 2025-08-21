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
 * // Basic ISBN validation (accepts both ISBN-10 and ISBN-13)
 * const isValidIsbn = isIsbn()
 * 
 * isValidIsbn("0-306-40615-2")        // true (ISBN-10)
 * isValidIsbn("978-0-306-40615-7")    // true (ISBN-13)
 * isValidIsbn("0306406152")           // true (without hyphens)
 * isValidIsbn("9780306406157")        // true (without hyphens)
 * isValidIsbn("123456789X")           // true (X check digit)
 * isValidIsbn("invalid")              // false
 * isValidIsbn("")                     // false
 * 
 * // ISBN-10 only validation
 * const isbn10Only = isIsbn({ version: 10 })
 * 
 * isbn10Only("0-306-40615-2")         // true
 * isbn10Only("0306406152")            // true
 * isbn10Only("123456789X")            // true (X check digit)
 * isbn10Only("978-0-306-40615-7")     // false (ISBN-13)
 * isbn10Only("9780306406157")         // false (ISBN-13)
 * 
 * // ISBN-13 only validation
 * const isbn13Only = isIsbn({ version: 13 })
 * 
 * isbn13Only("978-0-306-40615-7")     // true
 * isbn13Only("9780306406157")         // true
 * isbn13Only("979-10-90636-07-1")     // true (979 prefix)
 * isbn13Only("0-306-40615-2")         // false (ISBN-10)
 * isbn13Only("0306406152")            // false (ISBN-10)
 * 
 * // With various formatting
 * const validator = isIsbn()
 * 
 * validator("0 306 40615 2")          // true (spaces)
 * validator("0-306-40615-2")          // true (hyphens)
 * validator("0 306-40615 2")          // true (mixed)
 * validator("ISBN 0-306-40615-2")     // false (with prefix)
 * validator("(0306406152)")            // false (with parentheses)
 * 
 * // Case insensitive X check digit
 * const withX = isIsbn({ version: 10 })
 * 
 * withX("123456789X")                 // true (uppercase X)
 * withX("123456789x")                 // true (lowercase x)
 * 
 * // Book catalog validation
 * const validateBookIsbn = (
 *   isbn: unknown
 * ): string | null => {
 *   if (typeof isbn !== "string") {
 *     return "ISBN must be text"
 *   }
 *   
 *   const trimmed = isbn.trim()
 *   if (trimmed.length === 0) {
 *     return "ISBN is required"
 *   }
 *   
 *   if (!isIsbn()(trimmed)) {
 *     return "Invalid ISBN format"
 *   }
 *   
 *   return null
 * }
 * 
 * validateBookIsbn("978-0-306-40615-7")  // null (valid)
 * validateBookIsbn("invalid-isbn")       // "Invalid ISBN format"
 * validateBookIsbn("")                   // "ISBN is required"
 * 
 * // Convert ISBN-10 to ISBN-13
 * const convertToIsbn13 = (isbn10: string): string | null => {
 *   if (!isIsbn({ version: 10 })(isbn10)) {
 *     return null
 *   }
 *   
 *   // Remove non-digits (except X)
 *   const clean = isbn10.replace(/[^0-9X]/gi, "")
 *   const withoutCheck = clean.substring(0, 9)
 *   
 *   // Add 978 prefix
 *   const isbn13Base = "978" + withoutCheck
 *   
 *   // Calculate ISBN-13 check digit
 *   let sum = 0
 *   for (let i = 0; i < 12; i++) {
 *     const digit = parseInt(isbn13Base[i], 10)
 *     sum += digit * (i % 2 === 0 ? 1 : 3)
 *   }
 *   const checkDigit = (10 - (sum % 10)) % 10
 *   
 *   return isbn13Base + checkDigit
 * }
 * 
 * convertToIsbn13("0-306-40615-2")  // "9780306406157"
 * convertToIsbn13("0306406152")     // "9780306406157"
 * 
 * // Extract ISBN from text
 * const extractIsbns = (text: string): Array<string> => {
 *   // Pattern for potential ISBNs
 *   const pattern = /\b(?:\d{9}[\dX]|\d{13})\b/gi
 *   const matches = text.match(pattern) || []
 *   
 *   return matches.filter(isIsbn())
 * }
 * 
 * const text = "Books: ISBN 0306406152 and 9780306406157, invalid: 1234567890"
 * extractIsbns(text)  // ["0306406152", "9780306406157"]
 * 
 * // Normalize ISBN for storage
 * const normalizeIsbn = (isbn: string): string | null => {
 *   if (!isIsbn()(isbn)) {
 *     return null
 *   }
 *   
 *   // Remove all non-alphanumeric characters
 *   return isbn.replace(/[^0-9X]/gi, "").toUpperCase()
 * }
 * 
 * normalizeIsbn("978-0-306-40615-7")  // "9780306406157"
 * normalizeIsbn("0-306-40615-2")      // "0306406152"
 * normalizeIsbn("123456789x")         // "123456789X"
 * 
 * // Batch ISBN validation
 * const isbns = [
 *   "978-0-306-40615-7",
 *   "0-306-40615-2",
 *   "invalid-isbn",
 *   "",
 *   "123456789X",
 *   "9790306406157"  // Invalid check digit
 * ]
 * 
 * const validIsbns = isbns.filter(isIsbn())
 * // ["978-0-306-40615-7", "0-306-40615-2", "123456789X"]
 * 
 * // Library system validation
 * const validateLibraryBook = (
 *   book: { title: string; isbn: string; publisher?: string }
 * ): Array<string> => {
 *   const errors: Array<string> = []
 *   
 *   if (!book.title || book.title.trim().length === 0) {
 *     errors.push("Title is required")
 *   }
 *   
 *   if (!isIsbn()(book.isbn)) {
 *     errors.push("Invalid ISBN")
 *   }
 *   
 *   return errors
 * }
 * 
 * validateLibraryBook({
 *   title: "Example Book",
 *   isbn: "978-0-306-40615-7"
 * })  // []
 * 
 * // Invalid inputs
 * const checker = isIsbn()
 * 
 * checker(null)                       // false
 * checker(undefined)                  // false
 * checker(123)                        // false (not a string)
 * checker("")                         // false (empty)
 * checker("978")                      // false (too short)
 * checker("97803064061577")           // false (14 digits)
 * checker("978-0-306-40615-8")        // false (wrong check digit)
 * checker("0-306-40615-3")            // false (wrong check digit)
 * checker("X23456789X")               // false (X only valid as last digit in ISBN-10)
 * 
 * // Publisher identification
 * const getPublisherCode = (isbn: string): string | null => {
 *   if (!isIsbn()(isbn)) {
 *     return null
 *   }
 *   
 *   const clean = isbn.replace(/[^0-9X]/gi, "")
 *   
 *   if (clean.length === 10) {
 *     // ISBN-10: publisher is typically digits 2-7 (varies by region)
 *     return clean.substring(1, 7)
 *   } else {
 *     // ISBN-13: publisher is typically digits 4-9 (varies by region)
 *     return clean.substring(3, 9)
 *   }
 * }
 * 
 * getPublisherCode("978-0-306-40615-7")  // "030640"
 * getPublisherCode("0-306-40615-2")      // "306406"
 * 
 * // Format ISBN for display
 * const formatIsbn = (isbn: string): string | null => {
 *   if (!isIsbn()(isbn)) {
 *     return null
 *   }
 *   
 *   const clean = isbn.replace(/[^0-9X]/gi, "").toUpperCase()
 *   
 *   if (clean.length === 10) {
 *     // Format as X-XXX-XXXXX-X (common pattern, actual varies)
 *     return `${clean[0]}-${clean.slice(1, 4)}-${clean.slice(4, 9)}-${clean[9]}`
 *   } else {
 *     // Format as XXX-X-XXX-XXXXX-X (common pattern, actual varies)
 *     return `${clean.slice(0, 3)}-${clean[3]}-${clean.slice(4, 7)}-${clean.slice(7, 12)}-${clean[12]}`
 *   }
 * }
 * 
 * formatIsbn("9780306406157")  // "978-0-306-40615-7"
 * formatIsbn("0306406152")     // "0-306-40615-2"
 * ```
 * 
 * @property Curried - Returns a predicate function for reuse
 * @property Pure - No side effects, returns consistent results
 * @property Version-aware - Can validate ISBN-10, ISBN-13, or both
 * @property Checksum-validated - Verifies check digit correctness
 * @property Format-flexible - Accepts hyphens and spaces
 * @property Case-insensitive - X check digit can be upper or lowercase
 */
type IsbnOptions = {
	version?: 10 | 13
}

const isIsbn = (
	options: IsbnOptions = {}
): ((value: unknown) => boolean) => {
	return (value: unknown): boolean => {
		if (typeof value !== "string" || value.length === 0) {
			return false
		}

		// Remove hyphens and spaces, convert to uppercase
		const isbn = value.replace(/[\s-]/g, "").toUpperCase()

		// Check length and version
		const { version } = options

		if (version === 10) {
			return isValidIsbn10(isbn)
		} else if (version === 13) {
			return isValidIsbn13(isbn)
		} else {
			// Accept either version
			return isValidIsbn10(isbn) || isValidIsbn13(isbn)
		}
	}
}

const isValidIsbn10 = (isbn: string): boolean => {
	// ISBN-10 must be exactly 10 characters
	if (isbn.length !== 10) {
		return false
	}

	// First 9 must be digits, last can be digit or X
	if (!/^\d{9}[\dX]$/.test(isbn)) {
		return false
	}

	// Calculate check digit
	let sum = 0
	for (let i = 0; i < 9; i++) {
		sum += parseInt(isbn[i], 10) * (10 - i)
	}

	// Add check digit (X = 10)
	const checkChar = isbn[9]
	const checkValue = checkChar === "X" ? 10 : parseInt(checkChar, 10)
	sum += checkValue

	return sum % 11 === 0
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
	let sum = 0
	for (let i = 0; i < 12; i++) {
		const digit = parseInt(isbn[i], 10)
		sum += digit * (i % 2 === 0 ? 1 : 3)
	}

	const checkDigit = (10 - (sum % 10)) % 10
	return checkDigit === parseInt(isbn[12], 10)
}

export default isIsbn