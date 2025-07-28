import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

import MusicAlbumReleaseTypeComponent from "../../../../../../components/Thing/Intangible/Enumeration/MusicAlbumReleaseType/index.tsx"

export interface MusicAlbumReleaseTypeProps {
}

type MusicAlbumReleaseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MusicAlbumReleaseTypeProps

export default MusicAlbumReleaseType
