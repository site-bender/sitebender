import isEmpty from "../isEmpty/index.ts"

type AlphaOptions = {
	allowSpaces?: boolean
	allowHyphens?: boolean
	allowApostrophes?: boolean
	unicode?: boolean
}

//++ Validates if a string contains only alphabetic characters
export default function isAlpha(options: AlphaOptions = {}) {
	return function checkIsAlpha(value: unknown): boolean {
		if (typeof value !== "string" || isEmpty(value)) {
			return false
		}

		const {
			allowSpaces = false,
			allowHyphens = false,
			allowApostrophes = false,
			unicode = false,
		} = options

		const basePattern = unicode ? "\\p{L}" : "a-zA-Z"
		const spacePattern = allowSpaces ? "\\s" : ""
		const hyphenPattern = allowHyphens ? "\\-" : ""
		const apostrophePattern = allowApostrophes ? "'" : ""
		
		const pattern = basePattern + spacePattern + hyphenPattern + apostrophePattern

		const regex = unicode
			? new RegExp(`^[${pattern}]+$`, "u")
			: new RegExp(`^[${pattern}]+$`)

		return regex.test(value)
	}
}

//?? [EXAMPLE] isAlpha()("HelloWorld") // true
//?? [EXAMPLE] isAlpha()("Hello World") // false (contains space)
//?? [EXAMPLE] isAlpha()("Hello123") // false (contains numbers)
//?? [EXAMPLE] isAlpha()("") // false (empty)
//?? [EXAMPLE] isAlpha()(null) // false
/*??
 * [EXAMPLE]
 * const isBasicAlpha = isAlpha()
 * isBasicAlpha("HelloWorld")  // true
 * isBasicAlpha("Hello World") // false (contains space)
 * isBasicAlpha("Hello123")    // false (contains numbers)
 *
 * const isValidName = isAlpha({
 *   allowSpaces: true,
 *   allowHyphens: true,
 *   allowApostrophes: true
 * })
 * isValidName("Mary Jane")  // true
 * isValidName("Jean-Paul")  // true  
 * isValidName("O'Brien")    // true
 * isValidName("John123")    // false (contains numbers)
 *
 * const isUnicodeAlpha = isAlpha({ unicode: true })
 * isUnicodeAlpha("José")    // true
 * isUnicodeAlpha("北京")     // true (Chinese)
 * isUnicodeAlpha("Москва")  // true (Cyrillic)
 *
 * [GOTCHA] Empty strings always return false
 * [GOTCHA] Non-string values always return false
 */
