import type { Value } from "@sitebender/engine-types/index.ts"
import type { TextAreaAttributes } from "@sitebender/engine/constructors/elements/types/attributes/index.ts"

import { TEXTAREA_ROLES } from "@sitebender/engine/constructors/elements/constants/aria-roles.ts"
import { AUTOCOMPLETES, WRAPS } from "@sitebender/engine/constructors/elements/constants/index.ts"
import filterAttribute from "@sitebender/engine/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/engine/guards/isBoolean/index.ts"
import isInteger from "@sitebender/engine/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/engine/guards/isMemberOf/index.ts"
import isString from "@sitebender/engine/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/engine/guards/pickGlobalAttributes/index.ts"

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
