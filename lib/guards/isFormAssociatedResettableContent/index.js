import { FORM_ASSOCIATED_ELEMENTS_RESETTABLE } from "../../rendering/constants"

const isFormAssociateResettabledContent = ({ tag }) =>
	FORM_ASSOCIATED_ELEMENTS_RESETTABLE.includes(tag)

export default isFormAssociateResettabledContent
