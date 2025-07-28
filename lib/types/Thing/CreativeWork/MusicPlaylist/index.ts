import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MusicRecording from "../MusicRecording/index.ts"

import MusicRecordingComponent from "../../../../components/Thing/CreativeWork/MusicRecording/index.ts"
import ItemListComponent from "../../../../components/Thing/Intangible/ItemList/index.ts"

export interface MusicPlaylistProps {
	numTracks?: Integer
	track?:
		| ItemList
		| MusicRecording
		| ReturnType<typeof ItemListComponent>
		| ReturnType<typeof MusicRecordingComponent>
	tracks?: MusicRecording | ReturnType<typeof MusicRecordingComponent>
}

type MusicPlaylist = Thing & CreativeWorkProps & MusicPlaylistProps

export default MusicPlaylist
