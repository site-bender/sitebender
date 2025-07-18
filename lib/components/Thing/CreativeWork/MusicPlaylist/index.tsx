import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type MusicPlaylistProps from "../../../../types/Thing/MusicPlaylist/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	MusicPlaylistProps,
	"MusicPlaylist",
	ExtractLevelProps<MusicPlaylistProps, CreativeWorkProps>
>

export default function MusicPlaylist(
	{
		numTracks,
		track,
		tracks,
		schemaType = "MusicPlaylist",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numTracks,
				track,
				tracks,
				...subtypeProperties,
			}}
		/>
	)
}
