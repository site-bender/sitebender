import { Text } from "../../../DataType/index.ts"
import Duration from "../../Intangible/Quantity/Duration/index.ts"
import QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import MusicGroup from "../../Organization/PerformingGroup/MusicGroup/index.ts"
import Person from "../../Person/index.ts"
import CreativeWork from "../index.ts"
import MusicComposition from "../MusicComposition/index.ts"
import MusicPlaylist from "../MusicPlaylist/index.ts"
import MusicAlbum from "../MusicPlaylist/MusicAlbum/index.ts"

export default interface MusicRecording extends CreativeWork {
	/** The artist that performed this album or recording. */
	byArtist?: MusicGroup | Person
	/** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	duration?: QuantitativeValue | Duration
	/** The album to which this recording belongs. */
	inAlbum?: MusicAlbum
	/** The playlist to which this recording belongs. */
	inPlaylist?: MusicPlaylist
	/** The International Standard Recording Code for the recording. */
	isrcCode?: Text
	/** The composition this track is a recording of. */
	recordingOf?: MusicComposition
}
