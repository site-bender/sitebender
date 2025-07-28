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

import MusicAlbumComponent from "../../../../../components/Thing/CreativeWork/MusicPlaylist/MusicAlbum/index.ts"
import MusicReleaseFormatTypeComponent from "../../../../../components/Thing/Intangible/Enumeration/MusicReleaseFormatType/index.ts"
import DurationComponent from "../../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"
import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export interface MusicReleaseProps {
	catalogNumber?: Text
	creditedTo?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	duration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	musicReleaseFormat?:
		| MusicReleaseFormatType
		| ReturnType<typeof MusicReleaseFormatTypeComponent>
	recordLabel?: Organization | ReturnType<typeof OrganizationComponent>
	releaseOf?: MusicAlbum | ReturnType<typeof MusicAlbumComponent>
}

type MusicRelease =
	& Thing
	& CreativeWorkProps
	& MusicPlaylistProps
	& MusicReleaseProps

export default MusicRelease
