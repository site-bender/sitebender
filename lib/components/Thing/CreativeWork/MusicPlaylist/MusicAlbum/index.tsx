import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { MusicPlaylistProps } from "../../../../../types/Thing/CreativeWork/MusicPlaylist/index.ts"
import type { MusicAlbumProps } from "../../../../../types/Thing/CreativeWork/MusicPlaylist/MusicAlbum/index.ts"

import MusicPlaylist from "../index.tsx"

export type Props = BaseComponentProps<
	MusicAlbumProps,
	"MusicAlbum",
	ExtractLevelProps<ThingProps, CreativeWorkProps, MusicPlaylistProps>
>

export default function MusicAlbum({
	albumProductionType,
	albumRelease,
	albumReleaseType,
	byArtist,
	schemaType = "MusicAlbum",
	subtypeProperties = {},
	...props
}): Props {
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
