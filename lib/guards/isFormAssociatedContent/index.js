import { FORM_ASSOCIATED_ELEMENTS } from "../../rendering/constants"

const isFormAssociatedContent = ({ tag }) =>
	FORM_ASSOCIATED_ELEMENTS.includes(tag)

export default isFormAssociatedContent
