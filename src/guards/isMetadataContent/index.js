import { METADATA_ELEMENTS } from "../../rendering/constants"

const isMetadataContent = ({ tag }) => METADATA_ELEMENTS.includes(tag)

export default isMetadataContent
