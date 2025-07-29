import type BaseProps from "../../../../../types/index.ts"
import type MusicAlbumProps from "../../../../../types/Thing/CreativeWork/MusicPlaylist/MusicAlbum/index.ts"

import MusicPlaylist from "../index.tsx"

export type Props = MusicAlbumProps & BaseProps

export default function MusicAlbum({
	albumProductionType,
	albumRelease,
	albumReleaseType,
	byArtist,
	_type = "MusicAlbum",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MusicPlaylist
			{...props}
			_type={_type}
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
