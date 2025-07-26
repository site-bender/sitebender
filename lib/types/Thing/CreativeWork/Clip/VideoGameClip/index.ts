import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

export interface VideoGameClipProps {
}

type VideoGameClip =
	& Thing
	& CreativeWorkProps
	& ClipProps
	& VideoGameClipProps

export default VideoGameClip
