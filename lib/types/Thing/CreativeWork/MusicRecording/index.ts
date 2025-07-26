import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type MusicAlbum from "../MusicPlaylist/MusicAlbum/index.ts"
import type MusicComposition from "../MusicComposition/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type MusicPlaylist from "../MusicPlaylist/index.ts"
import type Person from "../../Person/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface MusicRecordingProps {
	byArtist?: MusicGroup | Person
	duration?: Duration | QuantitativeValue
	inAlbum?: MusicAlbum
	inPlaylist?: MusicPlaylist
	isrcCode?: Text
	recordingOf?: MusicComposition
}

type MusicRecording =
	& Thing
	& CreativeWorkProps
	& MusicRecordingProps

export default MusicRecording
