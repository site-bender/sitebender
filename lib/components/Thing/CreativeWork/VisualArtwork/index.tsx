import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type VisualArtworkProps from "../../../../types/Thing/VisualArtwork/index.ts"

import CreativeWork from "../index.tsx"

export type Props = BaseComponentProps<
	VisualArtworkProps,
	"VisualArtwork",
	ExtractLevelProps<VisualArtworkProps, CreativeWorkProps>
>

export default function VisualArtwork(
	{
		artEdition,
		artMedium,
		artform,
		artist,
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
		schemaType = "VisualArtwork",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				artEdition,
				artMedium,
				artform,
				artist,
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
		/>
	)
}
