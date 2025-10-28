import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MusicRecording from "../MusicRecording/index.ts"
import type { MusicAlbumType } from "./MusicAlbum/index.ts"
import type { MusicReleaseType } from "./MusicRelease/index.ts"

import MusicRecordingComponent from "../../../../../../architect/src/define/Thing/CreativeWork/MusicRecording/index.tsx"
import ItemListComponent from "../../../../../../architect/src/define/Thing/Intangible/ItemList/index.tsx"

export type MusicPlaylistType =
	| "MusicPlaylist"
	| MusicAlbumType
	| MusicReleaseType

export interface MusicPlaylistProps {
	"@type"?: MusicPlaylistType
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
