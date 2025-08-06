import type { Text, URL } from "../../../../DataType/index.ts"
import type MusicAlbum from "../../../CreativeWork/MusicPlaylist/MusicAlbum/index.ts"
import type MusicRecording from "../../../CreativeWork/MusicRecording/index.ts"
import type Thing from "../../../index.ts"
import type ItemList from "../../../Intangible/ItemList/index.ts"
import type Person from "../../../Person/index.ts"
import type { OrganizationProps } from "../../index.ts"
import type { PerformingGroupProps } from "../index.ts"

import { MusicAlbum as MusicAlbumComponent } from "../../../../../../components/index.tsx"
import { MusicRecording as MusicRecordingComponent } from "../../../../../../components/index.tsx"
import { ItemList as ItemListComponent } from "../../../../../../components/index.tsx"
import { Person as PersonComponent } from "../../../../../../components/index.tsx"

export type MusicGroupType = "MusicGroup"

export interface MusicGroupProps {
	"@type"?: MusicGroupType
	album?: MusicAlbum | ReturnType<typeof MusicAlbumComponent>
	albums?: MusicAlbum | ReturnType<typeof MusicAlbumComponent>
	genre?: Text | URL
	musicGroupMember?: Person | ReturnType<typeof PersonComponent>
	track?:
		| ItemList
		| MusicRecording
		| ReturnType<typeof ItemListComponent>
		| ReturnType<typeof MusicRecordingComponent>
	tracks?: MusicRecording | ReturnType<typeof MusicRecordingComponent>
}

type MusicGroup =
	& Thing
	& OrganizationProps
	& PerformingGroupProps
	& MusicGroupProps

export default MusicGroup
