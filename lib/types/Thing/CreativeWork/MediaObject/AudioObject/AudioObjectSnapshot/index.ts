import type Thing from "../../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { AudioObjectProps } from "../index.ts"

export interface AudioObjectSnapshotProps {}

type AudioObjectSnapshot =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& AudioObjectProps
	& AudioObjectSnapshotProps

export default AudioObjectSnapshot
