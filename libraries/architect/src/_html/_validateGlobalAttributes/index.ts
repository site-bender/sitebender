import _validateEnumeratedAttribute from "../_validateEnumeratedAttribute/index.ts"
import _validateIdAttribute from "../_validateIdAttribute/index.ts"
import _validateStringAttribute from "../_validateStringAttribute/index.ts"
import _validateTrueFalseOrBoolean from "../_validateTrueFalseOrBoolean/index.ts"
import _validateYesNoOrBoolean from "../_validateYesNoOrBoolean/index.ts"
import _validateAccesskey from "./_validateAccesskey/index.ts"
import _validateClass from "./_validateClass/index.ts"
import _validateTabindex from "./_validateTabindex/index.ts"

/*++
 + Validates global HTML attributes from props object
 + Returns valid global attributes, bad values as data-§-bad-*, unknown attrs as data-*
 + ID is always present (generated if absent)
 + Invalid values: data-§-bad-${attr} (our system namespace)
 + Unknown attributes: data-${attr} (user's custom namespace)
 */
export default function _validateGlobalAttributes(
	props: Readonly<Record<string, unknown>>,
): Readonly<Record<string, string>> {
	const globals = {
		..._validateAccesskey(props),
		..._validateEnumeratedAttribute("autocapitalize")(props),
		..._validateClass(props),
		..._validateEnumeratedAttribute("contenteditable")(props),
		..._validateEnumeratedAttribute("dir")(props),
		..._validateEnumeratedAttribute("draggable")(props),
		..._validateEnumeratedAttribute("enterkeyhint")(props),
		..._validateStringAttribute("exportparts")(props),
		..._validateEnumeratedAttribute("hidden")(props),
		..._validateIdAttribute(props),
		..._validateEnumeratedAttribute("inert")(props),
		..._validateEnumeratedAttribute("inputmode")(props),
		..._validateStringAttribute("is")(props),
		..._validateStringAttribute("lang")(props),
		..._validateStringAttribute("nonce")(props),
		..._validateStringAttribute("part")(props),
		..._validateEnumeratedAttribute("popover")(props),
		..._validateStringAttribute("slot")(props),
		..._validateTrueFalseOrBoolean("spellcheck")(props),
		..._validateStringAttribute("style")(props),
		..._validateTabindex(props),
		..._validateStringAttribute("title")(props),
		..._validateYesNoOrBoolean("translate")(props),
	}

	return globals
}
