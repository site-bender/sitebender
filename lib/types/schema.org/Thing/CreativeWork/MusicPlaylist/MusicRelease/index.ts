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

import { MusicAlbum as MusicAlbumComponent } from "../../../../../../components/index.tsx"
import { MusicReleaseFormatType as MusicReleaseFormatTypeComponent } from "../../../../../../components/index.tsx"
import { Duration as DurationComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"
import { Organization as OrganizationComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"

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
