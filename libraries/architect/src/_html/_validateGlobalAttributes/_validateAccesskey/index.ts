import isDefined from "@sitebender/toolsmith/predicates/isDefined/index.ts"
import isPrintableCharacter from "@sitebender/toolsmith/predicates/isPrintableCharacter/index.ts"

/*++
 + Validates accesskey global attribute (keyboard shortcut)
 + Accepts single ASCII printable character (space through tilde)
 + Returns { accesskey: value } if valid, data-§-bad-accesskey if invalid, {} if absent
 + Best practice: accesskey should be a single printable character
 */
export default function _validateAccesskey(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	if (isDefined(props.accesskey)) {
		const value = props.accesskey

		if (isPrintableCharacter(value)) {
			return { accesskey: value }
		}

		return { "data-§-bad-accesskey": String(value) }
	}

	return {}
}
