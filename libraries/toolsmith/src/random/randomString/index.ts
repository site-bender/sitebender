import isEmpty from "../../validation/isEmpty/index.ts"
import isNullish from "../../validation/isNullish/index.ts"

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
