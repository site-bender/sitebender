import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type ImageGalleryProps from "../../../../../../../types/Thing/ImageGallery/index.ts"
import type MediaGalleryProps from "../../../../../../../types/Thing/MediaGallery/index.ts"

import MediaGallery from "../index.tsx"

// ImageGallery adds no properties to the MediaGallery schema type
export type Props = BaseComponentProps<
	ImageGalleryProps,
	"ImageGallery",
	ExtractLevelProps<ImageGalleryProps, MediaGalleryProps>
>

export default function ImageGallery({
	schemaType = "ImageGallery",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MediaGallery
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
