import isString from "@sitebender/toolsmith/predicates/isString/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

/*++
 + Validates lang global attribute (language code)
 + Accepts any string value (BCP 47 language tag validation would be complex)
 + Returns { lang: value } if valid string, {} if absent or invalid
 */
export default function _validateLang(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("lang" in props)) {
		return {}
	}

	const value = props.lang

	if (isString(value)) {
		return { lang: value as string }
	}

	return {}
}
