import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type MediaObject from "../index.ts"

export interface AudioObjectProps {
	/** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the [[encodingFormat]]. */
	caption?: MediaObject | Text
	/** Represents textual captioning from a [[MediaObject]], e.g. text of a 'meme'. */
	embeddedTextCaption?: Text
	/** If this MediaObject is an AudioObject or VideoObject, the transcript of that object. */
	transcript?: Text
}

type AudioObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& AudioObjectProps

export default AudioObject
