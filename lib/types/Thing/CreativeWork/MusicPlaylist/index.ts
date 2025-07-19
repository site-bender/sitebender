import type { Integer } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type MusicRecording from "../MusicRecording/index.ts"

export interface MusicPlaylistProps {
	/** The number of tracks in this album or playlist. */
	numTracks?: Integer
	/** A music recording (track)&#x2014;usually a single song. If an ItemList is given, the list should contain items of type MusicRecording. */
	track?: MusicRecording | ItemList
	/** A music recording (track)&#x2014;usually a single song. */
	tracks?: MusicRecording
}

type MusicPlaylist =
	& Thing
	& CreativeWorkProps
	& MusicPlaylistProps

export default MusicPlaylist
