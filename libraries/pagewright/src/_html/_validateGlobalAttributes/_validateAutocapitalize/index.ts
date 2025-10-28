import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import and from "@sitebender/toolsmith/logic/and/index.ts"

/*++
 + Validates autocapitalize global attribute
 + Valid values: "off" | "none" | "on" | "sentences" | "words" | "characters"
 + Returns { autocapitalize: value } if valid, {} if absent or invalid
 */
export default function _validateAutocapitalize(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("autocapitalize" in props)) {
		return {}
	}

	const value = props.autocapitalize
	const validValues = ["off", "none", "on", "sentences", "words", "characters"] as const

	if (and(isString(value))(includes(validValues)(value))) {
		return { autocapitalize: value as string }
	}

	return {}
}
