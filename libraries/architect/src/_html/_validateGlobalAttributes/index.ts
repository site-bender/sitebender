import entries from "@sitebender/toolsmith/object/entries/index.ts"
import filter from "@sitebender/toolsmith/array/filter/index.ts"
import getOrElse from "@sitebender/toolsmith/monads/result/getOrElse/index.ts"
import includes from "@sitebender/toolsmith/array/includes/index.ts"
import not from "@sitebender/toolsmith/logic/not/index.ts"
import reduce from "@sitebender/toolsmith/array/reduce/index.ts"
import _validateEnumeratedAttribute from "../_validateEnumeratedAttribute/index.ts"
import _validateIdAttribute from "../_validateIdAttribute/index.ts"
import _validateStringAttribute from "../_validateStringAttribute/index.ts"
import _validateTrueFalseOrBoolean from "../_validateTrueFalseOrBoolean/index.ts"
import _validateYesNoOrBoolean from "../_validateYesNoOrBoolean/index.ts"
import _validateAccesskey from "./_validateAccesskey/index.ts"
import _validateClass from "./_validateClass/index.ts"
import _validateTabindex from "./_validateTabindex/index.ts"
import { GLOBAL_ATTRIBUTES } from "../constants/index.ts"

type ValidationResult = Readonly<{
	globalAttrs: Readonly<Record<string, string>>
	otherAttrs: Readonly<Record<string, unknown>>
}>

/*++
 + Validates global HTML attributes from props object
 + Returns globalAttrs (validated) and otherAttrs (remaining props)
 + ID is always present (generated if absent)
 + Invalid values: data-§-bad-${attr} (our system namespace)
 */
export default function _validateGlobalAttributes(
	props: Readonly<Record<string, unknown>>,
): ValidationResult {
	const globalAttrs = {
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
		..._validateStringAttribute("itemid")(props),
		..._validateStringAttribute("itemprop")(props),
		..._validateStringAttribute("itemref")(props),
		..._validateEnumeratedAttribute("itemscope")(props),
		..._validateStringAttribute("itemtype")(props),
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
		..._validateEnumeratedAttribute("virtualkeyboardpolicy")(props),
	}

	function isNotGlobalAttribute(entry: readonly [string, unknown]): boolean {
		const [key] = entry

		return not(includes(GLOBAL_ATTRIBUTES)(key))
	}

	function buildOtherAttrs(
		accumulator: Readonly<Record<string, unknown>>,
		entry: readonly [string, unknown],
	): Readonly<Record<string, unknown>> {
		const [key, value] = entry

		return {
			...accumulator,
			[key]: value,
		}
	}

	const propsEntriesResult = entries(props)
	const propsEntries = getOrElse(
		[] as ReadonlyArray<readonly [string, unknown]>,
	)(propsEntriesResult)
	const nonGlobalEntriesResult = filter(isNotGlobalAttribute)(propsEntries)
	const nonGlobalEntries = getOrElse(
		[] as ReadonlyArray<readonly [string, unknown]>,
	)(nonGlobalEntriesResult)
	const otherAttrs = reduce(buildOtherAttrs)({})(nonGlobalEntries)

	return {
		globalAttrs,
		otherAttrs,
	}
}
