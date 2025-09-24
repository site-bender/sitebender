import type Thing from "../../../index.ts"
import type MusicAlbumProductionType from "../../../Intangible/Enumeration/MusicAlbumProductionType/index.ts"
import type MusicAlbumReleaseType from "../../../Intangible/Enumeration/MusicAlbumReleaseType/index.ts"
import type MusicGroup from "../../../Organization/PerformingGroup/MusicGroup/index.ts"
import type Person from "../../../Person/index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { MusicPlaylistProps } from "../index.ts"
import type MusicRelease from "../MusicRelease/index.ts"

import MusicReleaseComponent from "../../../../../../../codewright/src/define/Thing/CreativeWork/MusicPlaylist/MusicRelease/index.tsx"
import MusicAlbumProductionTypeComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MusicAlbumProductionType/index.tsx"
import MusicAlbumReleaseTypeComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MusicAlbumReleaseType/index.tsx"
import MusicGroupComponent from "../../../../../../../codewright/src/define/Thing/Organization/PerformingGroup/MusicGroup/index.tsx"
import PersonComponent from "../../../../../../../codewright/src/define/Thing/Person/index.tsx"

export type MusicAlbumType = "MusicAlbum"

export interface MusicAlbumProps {
	"@type"?: MusicAlbumType
	albumProductionType?:
		| MusicAlbumProductionType
		| ReturnType<typeof MusicAlbumProductionTypeComponent>
	albumRelease?: MusicRelease | ReturnType<typeof MusicReleaseComponent>
	albumReleaseType?:
		| MusicAlbumReleaseType
		| ReturnType<typeof MusicAlbumReleaseTypeComponent>
	byArtist?:
		| MusicGroup
		| Person
		| ReturnType<typeof MusicGroupComponent>
		| ReturnType<typeof PersonComponent>
}

type MusicAlbum =
	& Thing
	& CreativeWorkProps
	& MusicPlaylistProps
	& MusicAlbumProps

export default MusicAlbum
