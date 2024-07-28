import Filtered from "../../../../constructors/Filtered"
import filterAttribute from "../../../../guards/filterAttribute"
import isBoolean from "../../../../guards/isBoolean"
import isMemberOf from "../../../../guards/isMemberOf"
import isString from "../../../../guards/isString"
import pickGlobalAttributes from "../../../../guards/pickGlobalAttributes"
import {
	AUTOCOMPLETES,
	FORM_METHODS,
	FORM_TARGETS,
	RELS_FOR_FORM,
} from "../../../../rendering/constants"

export const filterAttributes = attributes => {
	const {
		acceptCharset,
		action,
		autocomplete,
		enctype,
		method,
		name,
		noValidate,
		rel,
		target,
		...attrs
	} = attributes || {}
	const globals = pickGlobalAttributes(attrs)

	return {
		...globals,
		...filterAttribute(isString)("acceptCharset")(acceptCharset),
		...filterAttribute(isString)("action")(action),
		...filterAttribute(isMemberOf(AUTOCOMPLETES))("autocomplete")(autocomplete),
		...filterAttribute(isString)("enctype")(enctype),
		...filterAttribute(isMemberOf(FORM_METHODS))("method")(method),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isBoolean)("noValidate")(noValidate),
		...filterAttribute(isMemberOf(RELS_FOR_FORM))("rel")(rel),
		...filterAttribute(isString)("name")(name),
		...filterAttribute(isMemberOf(FORM_TARGETS))("target")(target),
	}
}

const Form = Filtered("Form")(filterAttributes)

export default Form
