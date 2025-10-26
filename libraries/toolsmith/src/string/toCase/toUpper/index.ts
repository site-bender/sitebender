import isString from "../../../predicates/isString/index.ts"

//++ Convert to string to all upper case
export default function toUpper(str: string): string {
	if (isString(str)) {
		return str.toLocaleUpperCase()
	}

	return str
}
