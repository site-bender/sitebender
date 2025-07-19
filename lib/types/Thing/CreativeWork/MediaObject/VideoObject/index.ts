import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type MediaObject from "../index.ts"

export interface VideoObjectProps {
	/** An actor (individual or a group), e.g. in TV, radio, movie, video games etc., or in an event. Actors can be associated with individual items or with a series, episode, clip. */
	actor?: PerformingGroup | Person
	/** An actor, e.g. in TV, radio, movie, video games etc. Actors can be associated with individual items or with a series, episode, clip. */
	actors?: Person
	/** The caption for this object. For downloadable machine formats (closed caption, subtitles etc.) use MediaObject and indicate the [[encodingFormat]]. */
	caption?: MediaObject | Text
	/** A director of e.g. TV, radio, movie, video gaming etc. content, or of an event. Directors can be associated with individual items or with a series, episode, clip. */
	director?: Person
	/** A director of e.g. TV, radio, movie, video games etc. content. Directors can be associated with individual items or with a series, episode, clip. */
	directors?: Person
	/** Represents textual captioning from a [[MediaObject]], e.g. text of a 'meme'. */
	embeddedTextCaption?: Text
	/** The composer of the soundtrack. */
	musicBy?: MusicGroup | Person
	/** If this MediaObject is an AudioObject or VideoObject, the transcript of that object. */
	transcript?: Text
	/** The frame size of the video. */
	videoFrameSize?: Text
	/** The quality of the video. */
	videoQuality?: Text
}

type VideoObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& VideoObjectProps

export default VideoObject
