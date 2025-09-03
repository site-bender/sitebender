import type { SelectAttributes } from "@engineSrc/constructors/elements/types/attributes/index.ts"
import type { ElementConfig } from "@engineSrc/constructors/elements/types/index.ts"
import type {
import type { Record } from "../index.ts"

export default function filterAttributes(attributes: Record<string, Value>,) {

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
	} = attributes
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
