import { SECTIONING_ELEMENTS } from "../../rendering/constants"

const isSectioningContent = ({ tag }) => SECTIONING_ELEMENTS.includes(tag)

export default isSectioningContent
