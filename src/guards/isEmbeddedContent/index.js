import { EMBEDDED_ELEMENTS } from "../../rendering/constants"

const isEmbeddedContent = ({ tag }) => EMBEDDED_ELEMENTS.includes(tag)

export default isEmbeddedContent
