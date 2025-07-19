import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type MusicReleaseFormatType from "../../../Intangible/Enumeration/MusicReleaseFormatType/index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MusicPlaylistProps } from "../index.ts"
import type MusicAlbum from "../MusicAlbum/index.ts"

export interface MusicReleaseProps {
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

type MusicRelease =
	& Thing
	& CreativeWorkProps
	& MusicPlaylistProps
	& MusicReleaseProps

export default MusicRelease
