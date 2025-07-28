import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import MusicAlbumProductionTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/MusicAlbumProductionType/index.tsx"

export interface MusicAlbumProductionTypeProps {
}

type MusicAlbumProductionType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MusicAlbumProductionTypeProps

export default MusicAlbumProductionType
