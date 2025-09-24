import type { Value } from "@sitebender/architect-types/index.ts"
import type { SelectAttributes } from "@sitebender/architect/constructors/elements/types/attributes/index.ts"

import { getSelectAllowedRoles } from "@sitebender/architect/constructors/elements/constants/aria-roles.ts"
import { AUTOCOMPLETES } from "@sitebender/architect/constructors/elements/constants/index.ts"
import filterAttribute from "@sitebender/architect/guards/filterAttribute/index.ts"
import isBoolean from "@sitebender/architect/guards/isBoolean/index.ts"
import isInteger from "@sitebender/architect/guards/isInteger/index.ts"
import isMemberOf from "@sitebender/architect/guards/isMemberOf/index.ts"
import isString from "@sitebender/architect/guards/isString/index.ts"
import pickGlobalAttributes from "@sitebender/architect/guards/pickGlobalAttributes/index.ts"

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
