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

		const pattern = basePattern + spacePattern + hyphenPattern +
			apostrophePattern

		const regex = unicode
			? new RegExp(`^[${pattern}]+$`, "u")
			: new RegExp(`^[${pattern}]+$`)

		return regex.test(value)
	}
}
