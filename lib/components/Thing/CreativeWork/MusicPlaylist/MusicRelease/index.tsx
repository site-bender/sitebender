import type BaseProps from "../../../../../types/index.ts"
import type MusicReleaseProps from "../../../../../types/Thing/CreativeWork/MusicPlaylist/MusicRelease/index.ts"

import MusicPlaylist from "../index.tsx"

export type Props = MusicReleaseProps & BaseProps

export default function MusicRelease({
	catalogNumber,
	creditedTo,
	duration,
	musicReleaseFormat,
	recordLabel,
	releaseOf,
	_type = "MusicRelease",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MusicPlaylist
			{...props}
			_type={_type}
			subtypeProperties={{
				catalogNumber,
				creditedTo,
				duration,
				musicReleaseFormat,
				recordLabel,
				releaseOf,
				...subtypeProperties,
			}}
		>{children}</MusicPlaylist>
	)
}
