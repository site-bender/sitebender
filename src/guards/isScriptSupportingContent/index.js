import { SCRIPT_SUPPORTING_ELEMENTS } from "../../rendering/constants"

const isScriptSupportingContent = ({ tag }) =>
	SCRIPT_SUPPORTING_ELEMENTS.includes(tag)

export default isScriptSupportingContent
