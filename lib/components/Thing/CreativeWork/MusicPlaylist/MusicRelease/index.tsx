import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { MusicPlaylistProps } from "../../../../../types/Thing/CreativeWork/MusicPlaylist/index.ts"
import type { MusicReleaseProps } from "../../../../../types/Thing/CreativeWork/MusicPlaylist/MusicRelease/index.ts"

import MusicPlaylist from "../index.tsx"

export type Props = BaseComponentProps<
	MusicReleaseProps,
	"MusicRelease",
	ExtractLevelProps<ThingProps, CreativeWorkProps, MusicPlaylistProps>
>

export default function MusicRelease({
	catalogNumber,
	creditedTo,
	duration,
	musicReleaseFormat,
	recordLabel,
	releaseOf,
	schemaType = "MusicRelease",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MusicPlaylist
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				catalogNumber,
				creditedTo,
				duration,
				musicReleaseFormat,
				recordLabel,
				releaseOf,
				...subtypeProperties,
			}}
		/>
	)
}
