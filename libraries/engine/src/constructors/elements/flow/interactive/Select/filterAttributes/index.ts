import type { SelectAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { Value } from "@engineTypes/index.ts"
import { getSelectAllowedRoles } from "@engineSrc/constructors/elements/constants/aria-roles.ts"
import { AUTOCOMPLETES } from "@engineSrc/constructors/elements/constants/index.ts"
import pickGlobalAttributes from "@engineSrc/guards/pickGlobalAttributes/index.ts"
import filterAttribute from "@engineSrc/guards/filterAttribute/index.ts"
import isBoolean from "@engineSrc/guards/isBoolean/index.ts"
import isInteger from "@engineSrc/guards/isInteger/index.ts"
import isMemberOf from "@engineSrc/guards/isMemberOf/index.ts"
import isString from "@engineSrc/guards/isString/index.ts"

export default function filterAttributes(attributes: SelectAttributes) {

	const {
		autocomplete,
		disabled,
		form,
		multiple,
		name,
		required,
		role,
		size,
		...attrs
	} = attributes as unknown as Record<string, Value>
	const globals = pickGlobalAttributes(attrs)

	// Get allowed roles based on multiple attribute
	const allowedRoles = getSelectAllowedRoles(Boolean(multiple))

	const out: Record<string, Value> = {
		...globals,
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(
			autocomplete as Value,
		),
		...filterAttribute(isBoolean)("disabled")(disabled as Value),
		...filterAttribute(isString)("form")(form as Value),
		...filterAttribute(isBoolean)("multiple")(multiple as Value),
		...filterAttribute(isString)("name")(name as Value),
		...filterAttribute(isBoolean)("required")(required as Value),
		...filterAttribute(isMemberOf(allowedRoles))("role")(role as Value),
		...filterAttribute(isInteger)("size")(size as Value),
	} as Record<string, Value>

	return out

}
