import type Thing from "../../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { VideoObjectProps } from "../index.ts"

export interface VideoObjectSnapshotProps {
	"@type"?: "VideoObjectSnapshot"}

type VideoObjectSnapshot =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& VideoObjectProps
	& VideoObjectSnapshotProps

export default VideoObjectSnapshot
