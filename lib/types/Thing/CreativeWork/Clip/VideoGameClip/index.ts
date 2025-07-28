import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ClipProps } from "../index.ts"

import VideoGameClipComponent from "../../../../../../components/Thing/CreativeWork/Clip/VideoGameClip/index.tsx"

export interface VideoGameClipProps {
}

type VideoGameClip =
	& Thing
	& CreativeWorkProps
	& ClipProps
	& VideoGameClipProps

export default VideoGameClip
