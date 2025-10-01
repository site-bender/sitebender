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
