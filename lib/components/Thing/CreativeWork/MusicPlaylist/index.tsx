import type BaseProps from "../../../../types/index.ts"
import type MusicPlaylistProps from "../../../../types/Thing/CreativeWork/MusicPlaylist/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MusicPlaylistProps & BaseProps

export default function MusicPlaylist({
	numTracks,
	track,
	tracks,
	_type = "MusicPlaylist",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				numTracks,
				track,
				tracks,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
