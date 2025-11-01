import isString from "../../../predicates/isString/index.ts"

//++ Convert to string to all upper case
export default function toUpper(str: string): string {
	if (isString(str)) {
		//++ [EXCEPTION] .toLocaleUpperCase() permitted in Toolsmith for performance - provides toUpper wrapper
		return str.toLocaleUpperCase()
	}

	return str
}
