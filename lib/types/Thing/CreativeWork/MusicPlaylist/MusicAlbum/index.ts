import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MusicPlaylistProps } from "../index.ts"
import type MusicAlbumProductionType from "../../../Intangible/Enumeration/MusicAlbumProductionType/index.ts"
import type MusicAlbumReleaseType from "../../../Intangible/Enumeration/MusicAlbumReleaseType/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type MusicRelease from "../MusicRelease/index.ts"
import type Person from "../../../Person/index.ts"

export interface MusicAlbumProps {
	albumProductionType?: MusicAlbumProductionType
	albumRelease?: MusicRelease
	albumReleaseType?: MusicAlbumReleaseType
	byArtist?: MusicGroup | Person
}

type MusicAlbum =
	& Thing
	& CreativeWorkProps
	& MusicPlaylistProps
	& MusicAlbumProps

export default MusicAlbum
