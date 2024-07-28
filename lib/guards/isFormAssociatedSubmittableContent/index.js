import { FORM_ASSOCIATED_ELEMENTS_SUBMITTABLE } from "../../rendering/constants"

const isFormAssociatedSubmittableContent = ({ tag }) =>
	FORM_ASSOCIATED_ELEMENTS_SUBMITTABLE.includes(tag)

export default isFormAssociatedSubmittableContent
