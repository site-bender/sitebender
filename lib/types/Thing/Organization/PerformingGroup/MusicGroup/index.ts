import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { PerformingGroupProps } from "../index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"
import type MusicAlbum from "../../../CreativeWork/MusicPlaylist/MusicAlbum/index.ts"
import type MusicRecording from "../../../CreativeWork/MusicRecording/index.ts"
import type Person from "../../../Person/index.ts"

export interface MusicGroupProps {
	album?: MusicAlbum
	albums?: MusicAlbum
	genre?: Text | URL
	musicGroupMember?: Person
	track?: ItemList | MusicRecording
	tracks?: MusicRecording
}

type MusicGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps
	& MusicGroupProps

export default MusicGroup
