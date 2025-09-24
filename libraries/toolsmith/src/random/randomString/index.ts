import isEmpty from "../../vanilla/validation/isEmpty/index.ts"
import isNullish from "../../vanilla/validation/isNullish/index.ts"

//++ Generates a random string of specified length from a character set
export default function randomString(
	length: number | null | undefined,
) {
	return function (
		charset: string | null | undefined =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
	): string {
		if (
			isNullish(length) || typeof length !== "number" || length <= 0 ||
			!isFinite(length)
		) {
			return ""
		}

		if (isNullish(charset) || typeof charset !== "string" || isEmpty(charset)) {
			return ""
		}

		const len = Math.floor(length)

		return Array.from({ length: len }, () => {
			const index = Math.floor(Math.random() * charset.length)
			return charset[index]
		}).join("")
	}
}

//?? [EXAMPLE] randomString(8)() // "K9mN3pQx"
//?? [EXAMPLE] randomString(16)() // "a7Bc9XyZ2mNp4QrT"
//?? [EXAMPLE] randomString(6)('ABC123') // "1A3B2C"
//?? [EXAMPLE] randomString(32)('0123456789abcdef') // hex string
//?? [EXAMPLE] randomString(8)('01') // "10110101" (binary)
//?? [EXAMPLE] randomString(20)('ACGT') // "ATCGGATCGATCGTAGCTAG" (DNA)
/*??
 | [EXAMPLE]
 | const generateToken = randomString(32)
 | const token1 = generateToken()
 | const token2 = generateToken('0123456789ABCDEF')
 |
 | [GOTCHA] Returns empty string for invalid inputs (null, negative, empty charset)
 |
*/
