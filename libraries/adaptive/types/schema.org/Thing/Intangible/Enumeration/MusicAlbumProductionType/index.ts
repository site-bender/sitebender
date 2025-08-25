import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type MusicAlbumProductionTypeType = "MusicAlbumProductionType"

export interface MusicAlbumProductionTypeProps {
	"@type"?: MusicAlbumProductionTypeType
}

type MusicAlbumProductionType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MusicAlbumProductionTypeProps

export default MusicAlbumProductionType
