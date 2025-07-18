import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CoverArtProps from "../../../../../types/Thing/CoverArt/index.ts"
import type VisualArtworkProps from "../../../../../types/Thing/VisualArtwork/index.ts"

import VisualArtwork from "../index.tsx"

// CoverArt adds no properties to the VisualArtwork schema type
export type Props = BaseComponentProps<
	CoverArtProps,
	"CoverArt",
	ExtractLevelProps<CoverArtProps, VisualArtworkProps>
>

export default function CoverArt({
	schemaType = "CoverArt",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<VisualArtwork
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
