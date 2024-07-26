import { FORM_ASSOCIATED_ELEMENTS_LISTED } from "../../rendering/constants"

const isFormAssociatedListedContent = ({ tag }) =>
	FORM_ASSOCIATED_ELEMENTS_LISTED.includes(tag)

export default isFormAssociatedListedContent
