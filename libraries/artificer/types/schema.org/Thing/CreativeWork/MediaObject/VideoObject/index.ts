import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MediaObject from "../../../MediaObject/index.ts"
import type { MediaObjectProps } from "../../../MediaObject/index.ts"
import type PerformingGroup from "../../../Organization/PerformingGroup/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { VideoObjectSnapshotType } from "./VideoObjectSnapshot/index.ts"

import PerformingGroupComponent from "../../../../../../../pagewright/src/define/Thing/Organization/PerformingGroup/index.tsx"
import MusicGroupComponent from "../../../../../../../pagewright/src/define/Thing/Organization/PerformingGroup/MusicGroup/index.tsx"
import PersonComponent from "../../../../../../../pagewright/src/define/Thing/Person/index.tsx"
import { MediaObject as MediaObjectComponent } from "../../../../../../pagewright/index.tsx"

export type VideoObjectType = "VideoObject" | VideoObjectSnapshotType

export interface VideoObjectProps {
	"@type"?: VideoObjectType
	actor?:
		| PerformingGroup
		| Person
		| ReturnType<typeof PerformingGroupComponent>
		| ReturnType<typeof PersonComponent>
	actors?: Person | ReturnType<typeof PersonComponent>
	caption?: MediaObject | Text | ReturnType<typeof MediaObjectComponent>
	director?: Person | ReturnType<typeof PersonComponent>
	directors?: Person | ReturnType<typeof PersonComponent>
	embeddedTextCaption?: Text
	musicBy?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
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
