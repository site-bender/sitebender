import isEmpty from "../isEmpty/index.ts"

type AlphanumericOptions = {
	allowSpaces?: boolean
	allowHyphens?: boolean
	allowUnderscores?: boolean
	unicode?: boolean
}

//++ Validates if a string contains only alphanumeric characters
export default function isAlphanumeric(
	options: AlphanumericOptions = {},
) {
	return function checkIsAlphanumeric(value: unknown): boolean {
		if (typeof value !== "string" || isEmpty(value)) {
			return false
		}

		const {
			allowSpaces = false,
			allowHyphens = false,
			allowUnderscores = false,
			unicode = false,
		} = options

		const basePattern = unicode ? "\\p{L}\\p{N}" : "a-zA-Z0-9"
		const spacePattern = allowSpaces ? "\\s" : ""
		const hyphenPattern = allowHyphens ? "\\-" : ""
		const underscorePattern = allowUnderscores ? "_" : ""

		const pattern = basePattern + spacePattern + hyphenPattern +
			underscorePattern

		const regex = unicode
			? new RegExp(`^[${pattern}]+$`, "u")
			: new RegExp(`^[${pattern}]+$`)

		return regex.test(value)
	}
}

//?? [EXAMPLE] isAlphanumeric()("Hello123") // true
//?? [EXAMPLE] isAlphanumeric()("abc456") // true
//?? [EXAMPLE] isAlphanumeric()("Hello World") // false (contains space)
//?? [EXAMPLE] isAlphanumeric()("Hello-123") // false (contains hyphen)
//?? [EXAMPLE] isAlphanumeric()("") // false (empty)
//?? [EXAMPLE] isAlphanumeric()(123) // false (not string)
/*??
 | [EXAMPLE]
 | const validator = isAlphanumeric()
 | validator("Hello123")    // true
 | validator("abc456")      // true
 | validator("Hello World") // false (space)
 | validator("test_123")    // false (underscore)
 |
 | const withSpaces = isAlphanumeric({ allowSpaces: true })
 | withSpaces("Hello World 123")  // true
 | withSpaces("Product ID 456")   // true
 |
 | const withHyphens = isAlphanumeric({
 |   allowHyphens: true,
 |   allowUnderscores: true
 | })
 | withHyphens("UUID-1234-ABCD")  // true
 | withHyphens("user_name_123")   // true
 |
 | const unicode = isAlphanumeric({ unicode: true })
 | unicode("José123")  // true
 | unicode("北京2024")  // true (Chinese + numbers)
 | unicode("Москва99") // true (Cyrillic + numbers)
 |
 | [GOTCHA] Empty strings always return false
 | [GOTCHA] Non-string values always return false
 |
*/
