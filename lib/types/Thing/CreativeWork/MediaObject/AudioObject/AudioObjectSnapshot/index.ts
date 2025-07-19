// AudioObjectSnapshot extends AudioObject but adds no additional properties
import type Thing from "../../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { AudioObjectProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface AudioObjectSnapshotProps {}

type AudioObjectSnapshot =
	& Thing
	& AudioObjectProps
	& CreativeWorkProps
	& MediaObjectProps
	& AudioObjectSnapshotProps

export default AudioObjectSnapshot
