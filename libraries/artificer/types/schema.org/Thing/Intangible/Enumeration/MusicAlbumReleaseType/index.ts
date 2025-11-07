import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type MusicAlbumReleaseTypeType = "MusicAlbumReleaseType"

export interface MusicAlbumReleaseTypeProps {
	"@type"?: MusicAlbumReleaseTypeType
}

type MusicAlbumReleaseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MusicAlbumReleaseTypeProps

export default MusicAlbumReleaseType
