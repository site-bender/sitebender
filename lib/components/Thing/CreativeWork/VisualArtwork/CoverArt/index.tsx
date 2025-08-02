import type BaseProps from "../../../../../types/index.ts"
import type CoverArtProps from "../../../../../types/Thing/CreativeWork/VisualArtwork/CoverArt/index.ts"

import VisualArtwork from "../index.tsx"

export type Props = CoverArtProps & BaseProps

export default function CoverArt({
	_type = "CoverArt",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<VisualArtwork
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</VisualArtwork>
	)
}
