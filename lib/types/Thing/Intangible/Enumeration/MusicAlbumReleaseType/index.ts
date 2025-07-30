import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface MusicAlbumReleaseTypeProps {
	"@type"?: "MusicAlbumReleaseType"}

type MusicAlbumReleaseType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MusicAlbumReleaseTypeProps

export default MusicAlbumReleaseType
