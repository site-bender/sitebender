import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type MediaObject from "../../../MediaObject/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type Person from "../../../Person/index.ts"

import VideoObjectComponent from "../../../../../../components/Thing/CreativeWork/MediaObject/VideoObject/index.tsx"

export interface VideoObjectProps {
	actor?: PerformingGroup | Person
	actors?: Person
	caption?: MediaObject | Text
	director?: Person
	directors?: Person
	embeddedTextCaption?: Text
	musicBy?: MusicGroup | Person
	transcript?: Text
	videoFrameSize?: Text
	videoQuality?: Text
}

type VideoObject =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& VideoObjectProps

export default VideoObject
