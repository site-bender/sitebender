import type { Integer } from "../../../DataType/index.ts"
import type ItemList from "../../Intangible/ItemList/index.ts"
import type CreativeWork from "../index.ts"
import type MusicRecording from "../MusicRecording/index.ts"

export default interface MusicPlaylist extends CreativeWork {
	/** The number of tracks in this album or playlist. */
	numTracks?: Integer
	/** A music recording (track)&#x2014;usually a single song. If an ItemList is given, the list should contain items of type MusicRecording. */
	track?: MusicRecording | ItemList
	/** A music recording (track)&#x2014;usually a single song. */
	tracks?: MusicRecording
}
