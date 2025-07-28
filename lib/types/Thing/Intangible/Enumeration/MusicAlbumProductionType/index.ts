import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface MusicAlbumProductionTypeProps {}

type MusicAlbumProductionType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MusicAlbumProductionTypeProps

export default MusicAlbumProductionType
