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

export interface MusicRecordingProps {
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

type MusicRecording =
	& Thing
	& CreativeWorkProps
	& MusicRecordingProps

export default MusicRecording
