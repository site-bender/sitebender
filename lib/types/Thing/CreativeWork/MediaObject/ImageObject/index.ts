import type { Boolean, Text } from "../../../../DataType/index.ts"
import type PropertyValue from "../../../Intangible/StructuredValue/PropertyValue/index.ts"
import type MediaObject from "../index.ts"

export default interface ImageObject extends MediaObject {
	/** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the [[encodingFormat]]. */
	caption?: MediaObject | Text
	/** Represents textual captioning from a [[MediaObject]], e.g. text of a 'meme'. */
	embeddedTextCaption?: Text
	/** exif data for this object. */
	exifData?: PropertyValue | Text
	/** Indicates whether this image is representative of the content of the page. */
	representativeOfPage?: Boolean
}
