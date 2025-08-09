import isString from "../../guards/isString/index.ts"

export default function isCharacter(value: unknown): value is string {
	return isString(value) && value.length === 1
}
