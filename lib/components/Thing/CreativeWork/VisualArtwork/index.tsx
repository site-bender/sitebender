import type BaseProps from "../../../../types/index.ts"
import type VisualArtworkProps from "../../../../types/Thing/CreativeWork/VisualArtwork/index.ts"

import CreativeWork from "../index.tsx"

export type Props = VisualArtworkProps & BaseProps

export default function VisualArtwork({
	artEdition,
	artform,
	artist,
	artMedium,
	artworkSurface,
	colorist,
	depth,
	height,
	inker,
	letterer,
	penciler,
	surface,
	weight,
	width,
	_type = "VisualArtwork",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CreativeWork
			{...props}
			_type={_type}
			subtypeProperties={{
				artEdition,
				artform,
				artist,
				artMedium,
				artworkSurface,
				colorist,
				depth,
				height,
				inker,
				letterer,
				penciler,
				surface,
				weight,
				width,
				...subtypeProperties,
			}}
		>
			{children}
		</CreativeWork>
	)
}
