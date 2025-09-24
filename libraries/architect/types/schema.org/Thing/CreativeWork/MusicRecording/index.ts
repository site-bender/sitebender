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

import MusicCompositionComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MusicComposition/index.tsx"
import MusicPlaylistComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MusicPlaylist/index.tsx"
import MusicAlbumComponent from "../../../../../../codewright/src/define/Thing/CreativeWork/MusicPlaylist/MusicAlbum/index.tsx"
import DurationComponent from "../../../../../../codewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import QuantitativeValueComponent from "../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import MusicGroupComponent from "../../../../../../codewright/src/define/Thing/Organization/PerformingGroup/MusicGroup/index.tsx"
import PersonComponent from "../../../../../../codewright/src/define/Thing/Person/index.tsx"

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
	recordingOf?:
		| MusicComposition
		| ReturnType<typeof MusicCompositionComponent>
}

type MusicRecording = Thing & CreativeWorkProps & MusicRecordingProps

export default MusicRecording
