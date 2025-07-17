import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CollectionPageProps from "../../../../../../types/Thing/CollectionPage/index.ts"
import type MediaGalleryProps from "../../../../../../types/Thing/MediaGallery/index.ts"

import CollectionPage from "../index.tsx"

// MediaGallery adds no properties to the CollectionPage schema type
export type Props = BaseComponentProps<
	MediaGalleryProps,
	"MediaGallery",
	ExtractLevelProps<MediaGalleryProps, CollectionPageProps>
>

export default function MediaGallery({
	schemaType = "MediaGallery",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CollectionPage
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
