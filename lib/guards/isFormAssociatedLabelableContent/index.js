import { FORM_ASSOCIATED_ELEMENTS_LABELABLE } from "../../rendering/constants"

const isFormAssociatedLabelableContent = ({ tag }) =>
	FORM_ASSOCIATED_ELEMENTS_LABELABLE.includes(tag)

export default isFormAssociatedLabelableContent
