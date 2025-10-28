import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"

/*++
 + Validates dir global attribute (text direction)
 + Valid values: "ltr" | "rtl" | "auto"
 + Returns { dir: value } if valid, {} if absent or invalid
 */
export default function _validateDir(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("dir" in props)) {
		return {}
	}

	const value = props.dir
	const validValues = ["ltr", "rtl", "auto"] as const

	if (and(isString(value))(includes(validValues)(value))) {
		return { dir: value as string }
	}

	return {}
}
