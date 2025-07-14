import { Integer } from "../../../DataType/index.ts"
import ItemList from "../../Intangible/ItemList/index.ts"
import CreativeWork from "../index.ts"
import MusicRecording from "../MusicRecording/index.ts"

export default interface MusicPlaylist extends CreativeWork {
	/** The number of tracks in this album or playlist. */
	numTracks?: Integer
	/** A music recording (track)&#x2014;usually a single song. If an ItemList is given, the list should contain items of type MusicRecording. */
	track?: MusicRecording | ItemList
	/** A music recording (track)&#x2014;usually a single song. */
	tracks?: MusicRecording
}
