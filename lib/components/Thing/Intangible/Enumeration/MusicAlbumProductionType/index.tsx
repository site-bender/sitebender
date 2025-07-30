import type BaseProps from "../../../../../types/index.ts"
import type MusicAlbumProductionTypeProps from "../../../../../types/Thing/Intangible/Enumeration/MusicAlbumProductionType/index.ts"

import Enumeration from "../index.tsx"

export type Props = MusicAlbumProductionTypeProps & BaseProps

export default function MusicAlbumProductionType({
	_type = "MusicAlbumProductionType",
	children,
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
		>{children}</Enumeration>
	)
}
