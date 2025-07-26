import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MusicPlaylistProps } from "../index.ts"
import type Duration from "../../../Intangible/Quantity/Duration/index.ts"
import type MusicAlbum from "../MusicAlbum/index.ts"
import type MusicReleaseFormatType from "../../../Intangible/Enumeration/MusicReleaseFormatType/index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type QuantitativeValue from "../../../Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface MusicReleaseProps {
	catalogNumber?: Text
	creditedTo?: Organization | Person
	duration?: Duration | QuantitativeValue
	musicReleaseFormat?: MusicReleaseFormatType
	recordLabel?: Organization
	releaseOf?: MusicAlbum
}

type MusicRelease =
	& Thing
	& CreativeWorkProps
	& MusicPlaylistProps
	& MusicReleaseProps

export default MusicRelease
