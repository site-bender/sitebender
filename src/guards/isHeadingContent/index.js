import { HEADING_ELEMENTS } from "../../rendering/constants"

const isHeadingContent = ({ tag }) => HEADING_ELEMENTS.includes(tag)

export default isHeadingContent
