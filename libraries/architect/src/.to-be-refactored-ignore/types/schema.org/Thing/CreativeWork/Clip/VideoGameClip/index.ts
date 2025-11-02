import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

export type VideoGameClipType = "VideoGameClip"

export interface VideoGameClipProps {
	"@type"?: VideoGameClipType
}

type VideoGameClip = Thing & CreativeWorkProps & ClipProps & VideoGameClipProps

export default VideoGameClip
