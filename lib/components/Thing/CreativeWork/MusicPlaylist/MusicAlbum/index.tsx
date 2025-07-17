import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MusicAlbumProps from "../../../../../types/Thing/MusicAlbum/index.ts"
import type MusicPlaylistProps from "../../../../../types/Thing/MusicPlaylist/index.ts"

import MusicPlaylist from "../index.tsx"

export type Props = BaseComponentProps<
	MusicAlbumProps,
	"MusicAlbum",
	ExtractLevelProps<MusicAlbumProps, MusicPlaylistProps>
>

export default function MusicAlbum(
	{
		albumProductionType,
		albumRelease,
		albumReleaseType,
		byArtist,
		schemaType = "MusicAlbum",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MusicPlaylist
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				albumProductionType,
				albumRelease,
				albumReleaseType,
				byArtist,
				...subtypeProperties,
			}}
		/>
	)
}
