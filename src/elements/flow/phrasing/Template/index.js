import FilteredEmpty from "../../../../constructors/FilteredEmpty"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isMemberOf from "../../../../guards/isMemberOf"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import { SHADOW_ROOT_MODES } from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		shadowRootMode,
		shadowRootDelegatesFocus,
		shadowRootClonable,
		shadowRootSerializable,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isMemberOf(SHADOW_ROOT_MODES))("shadowRootMode")(
			shadowRootMode,
		),
		...filterAttribute(isBoolean)("shadowRootDelegatesFocus")(
			shadowRootDelegatesFocus,
		),
		...filterAttribute(isBoolean)("shadowRootClonable")(shadowRootClonable),
		...filterAttribute(isBoolean)("shadowRootSerializable")(
			shadowRootSerializable,
		),
	}
}

const Template = FilteredEmpty("Template")(filterAttributes)

export default Template
