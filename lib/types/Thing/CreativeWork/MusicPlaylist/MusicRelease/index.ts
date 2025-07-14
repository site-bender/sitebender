import { Text } from "../../../../DataType/index.ts"
import MusicReleaseFormatType from "../../../Intangible/Enumeration/MusicReleaseFormatType/index.ts"
import Duration from "../../../Intangible/Quantity/Duration/index.ts"
import QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import Organization from "../../../Organization/index.ts"
import Person from "../../../Person/index.ts"
import MusicPlaylist from "../index.ts"
import MusicAlbum from "../MusicAlbum/index.ts"

export default interface MusicRelease extends MusicPlaylist {
	/** The catalog number for the release. */
	catalogNumber?: Text
	/** The group the release is credited to if different than the byArtist. For example, Red and Blue is credited to "Stefani Germanotta Band", but by Lady Gaga. */
	creditedTo?: Organization | Person
	/** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	duration?: QuantitativeValue | Duration
	/** Format of this release (the type of recording media used, i.e. compact disc, digital media, LP, etc.). */
	musicReleaseFormat?: MusicReleaseFormatType
	/** The label that issued the release. */
	recordLabel?: Organization
	/** The album this is a release of. */
	releaseOf?: MusicAlbum
}
