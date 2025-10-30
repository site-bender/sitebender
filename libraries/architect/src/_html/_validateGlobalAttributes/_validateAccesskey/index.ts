import isPrintableCharacter from "@sitebender/toolsmith/predicates/isPrintableCharacter/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"

/*++
 + Validates accesskey global attribute (keyboard shortcut)
 + Accepts single ASCII printable character (space through tilde)
 + Returns { accesskey: value } if valid, {} if absent or invalid
 + Best practice: accesskey should be a single printable character
 */
export default function _validateAccesskey(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (not("accesskey" in props)) {
		return {}
	}

	const value = props.accesskey

	if (isPrintableCharacter(value)) {
		return { accesskey: value }
	}

	return {}
}
