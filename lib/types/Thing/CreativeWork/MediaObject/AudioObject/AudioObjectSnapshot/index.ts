import type Thing from "../../../../index.ts"
import type { CreativeWorkProps } from "../../../index.ts"
import type { MediaObjectProps } from "../../../../MediaObject/index.ts"
import type { AudioObjectProps } from "../index.ts"

import AudioObjectSnapshotComponent from "../../../../../../../components/Thing/CreativeWork/MediaObject/AudioObject/AudioObjectSnapshot/index.tsx"

export interface AudioObjectSnapshotProps {
}

type AudioObjectSnapshot =
	& Thing
	& CreativeWorkProps
	& MediaObjectProps
	& AudioObjectProps
	& AudioObjectSnapshotProps

export default AudioObjectSnapshot
