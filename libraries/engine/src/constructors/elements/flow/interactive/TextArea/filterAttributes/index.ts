import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"
import { TEXTAREA_ROLES } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import { AUTOCOMPLETES, WRAPS } from "@engineSrc/constructors/elements/constants/index.ts"
import type { TextAreaAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { Value } from "@engineTypes/index.ts"

export default function filterAttributes(attributes: TextAreaAttributes) {

	const {
		autocomplete,
		cols,
		dirName,
		disabled,
		form,
		maxLength,
		minLength,
		name,
		placeholder,
		readOnly,
		required,
		role,
		rows,
		wrap,
		...attrs
	} = attributes
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(
			autocomplete as Value,
		),
		...filterAttribute(isInteger)("cols")(cols),
		...filterAttribute(isString)("dirName")(dirName),
		...filterAttribute(isBoolean)("disabled")(disabled),
		...filterAttribute(isString)("form")(form),
		...filterAttribute(isInteger)("maxLength")(maxLength),
		...filterAttribute(isInteger)("minLength")(minLength),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isString)("placeholder")(placeholder),
		...filterAttribute(isBoolean)("readOnly")(readOnly),
		...filterAttribute(isBoolean)("required")(required),
		...filterAttribute(isMemberOf(TEXTAREA_ROLES))("role")(role),
		...filterAttribute(isInteger)("rows")(rows),
		...filterAttribute(isMemberOf(WRAPS))("wrap")(wrap),
	}

}
