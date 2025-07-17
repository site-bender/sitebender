import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ArtGalleryProps from "../../../../../../types/Thing/ArtGallery/index.ts"
import type EntertainmentBusinessProps from "../../../../../../types/Thing/EntertainmentBusiness/index.ts"

import EntertainmentBusiness from "../index.tsx"

// ArtGallery adds no properties to the EntertainmentBusiness schema type
export type Props = BaseComponentProps<
	ArtGalleryProps,
	"ArtGallery",
	ExtractLevelProps<ArtGalleryProps, EntertainmentBusinessProps>
>

export default function ArtGallery({
	schemaType = "ArtGallery",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<EntertainmentBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
