import isEmpty from "../../string/isEmpty/index.ts"
import isNullish from "../../predicates/isNullish/index.ts"

//++ Generates a random string of specified length from a character set
export default function randomString(
	length: number | null | undefined,
) {
	return function (
		charset: string | null | undefined =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
	): string {
		//++ [EXCEPTION] typeof, <=, isFinite operators permitted in Toolsmith for performance - provides type checking wrapper
		if (
			isNullish(length) || typeof length !== "number" || length <= 0 ||
			!isFinite(length)
		) {
			return ""
		}

		//++ [EXCEPTION] typeof operator permitted in Toolsmith for performance - provides type checking wrapper
		if (isNullish(charset) || typeof charset !== "string" || isEmpty(charset)) {
			return ""
		}

		//++ [EXCEPTION] Math.floor permitted in Toolsmith for performance - provides integer conversion wrapper
		const len = Math.floor(length)

		//++ [EXCEPTION] Array.from, Math.floor, Math.random(), *, .length, [], .join() permitted in Toolsmith for performance - provides random string wrapper
		return Array.from({ length: len }, () => {
			const index = Math.floor(Math.random() * charset.length)
			return charset[index]
		}).join("")
	}
}
