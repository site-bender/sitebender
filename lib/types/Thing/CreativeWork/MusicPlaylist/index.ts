import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type MusicRecording from "../MusicRecording/index.ts"

import MusicPlaylistComponent from "../../../../../components/Thing/CreativeWork/MusicPlaylist/index.tsx"

export interface MusicPlaylistProps {
	numTracks?: Integer
	track?: ItemList | MusicRecording
	tracks?: MusicRecording
}

type MusicPlaylist =
	& Thing
	& CreativeWorkProps
	& MusicPlaylistProps

export default MusicPlaylist
