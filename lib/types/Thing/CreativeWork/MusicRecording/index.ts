import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../Person/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MusicComposition from "../MusicComposition/index.ts"
import type MusicPlaylist from "../MusicPlaylist/index.ts"
import type MusicAlbum from "../MusicPlaylist/MusicAlbum/index.ts"

import MusicCompositionComponent from "../../../../components/Thing/CreativeWork/MusicComposition/index.ts"
import MusicPlaylistComponent from "../../../../components/Thing/CreativeWork/MusicPlaylist/index.ts"
import MusicAlbumComponent from "../../../../components/Thing/CreativeWork/MusicPlaylist/MusicAlbum/index.ts"
import DurationComponent from "../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import QuantitativeValueComponent from "../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import MusicGroupComponent from "../../../../components/Thing/Organization/PerformingGroup/MusicGroup/index.ts"
import PersonComponent from "../../../../components/Thing/Person/index.ts"

export type MusicRecordingType = "MusicRecording"

export interface MusicRecordingProps {
	"@type"?: MusicRecordingType
	byArtist?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	inAlbum?: MusicAlbum | ReturnType<typeof MusicAlbumComponent>
	inPlaylist?: MusicPlaylist | ReturnType<typeof MusicPlaylistComponent>
	isrcCode?: Text
	recordingOf?: MusicComposition | ReturnType<typeof MusicCompositionComponent>
}

type MusicRecording = Thing & CreativeWorkProps & MusicRecordingProps

export default MusicRecording
