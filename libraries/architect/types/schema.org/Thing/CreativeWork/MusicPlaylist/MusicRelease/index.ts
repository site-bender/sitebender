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

import MusicAlbumComponent from "../../../../../../../codewright/src/define/Thing/CreativeWork/MusicPlaylist/MusicAlbum/index.tsx"
import MusicReleaseFormatTypeComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MusicReleaseFormatType/index.tsx"
import DurationComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Quantity/Duration/index.tsx"
import QuantitativeValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"
import OrganizationComponent from "../../../../../../../codewright/src/define/Thing/Organization/index.tsx"
import PersonComponent from "../../../../../../../codewright/src/define/Thing/Person/index.tsx"

export type MusicReleaseType = "MusicRelease"

export interface MusicReleaseProps {
	"@type"?: MusicReleaseType
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
