// VideoObjectSnapshot extends VideoObject but adds no additional properties
import type Thing from "../../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { VideoObjectProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface VideoObjectSnapshotProps {}

type VideoObjectSnapshot =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& VideoObjectProps
	& VideoObjectSnapshotProps

export default VideoObjectSnapshot
