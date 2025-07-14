import { Text, URL } from "../../../../DataType/index.ts"
import MusicAlbum from "../../../CreativeWork/MusicPlaylist/MusicAlbum/index.ts"
import MusicRecording from "../../../CreativeWork/MusicRecording/index.ts"
import ItemList from "../../../Intangible/ItemList/index.ts"
import Person from "../../../Person/index.ts"
import PerformingGroup from "../index.ts"

export default interface MusicGroup extends PerformingGroup {
	/** A music album. */
	album?: MusicAlbum
	/** A collection of music albums. */
	albums?: MusicAlbum
	/** Genre of the creative work, broadcast channel or group. */
	genre?: Text | URL
	/** A member of a music group&#x2014;for example, John, Paul, George, or Ringo. */
	musicGroupMember?: Person
	/** A music recording (track)&#x2014;usually a single song. If an ItemList is given, the list should contain items of type MusicRecording. */
	track?: MusicRecording | ItemList
	/** A music recording (track)&#x2014;usually a single song. */
	tracks?: MusicRecording
}
