import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { VideoObjectProps } from "../index.ts"

import VideoObjectSnapshotComponent from "../../../../../../../components/Thing/CreativeWork/MediaObject/VideoObject/VideoObjectSnapshot/index.tsx"

export interface VideoObjectSnapshotProps {
}

type VideoObjectSnapshot =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& VideoObjectProps
	& VideoObjectSnapshotProps

export default VideoObjectSnapshot
