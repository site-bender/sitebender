import type BaseProps from "../../../../../types/index.ts"
import type MusicAlbumReleaseTypeProps from "../../../../../types/Thing/Intangible/Enumeration/MusicAlbumReleaseType/index.ts"

import Enumeration from "../index.tsx"

export type Props = MusicAlbumReleaseTypeProps & BaseProps

export default function MusicAlbumReleaseType({
	_type = "MusicAlbumReleaseType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
