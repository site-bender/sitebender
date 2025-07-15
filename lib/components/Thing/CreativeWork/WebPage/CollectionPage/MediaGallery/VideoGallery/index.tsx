import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../../types/index.ts"
import type MediaGalleryProps from "../../../../../../../types/Thing/MediaGallery/index.ts"
import type VideoGalleryProps from "../../../../../../../types/Thing/VideoGallery/index.ts"

import MediaGallery from "./index.tsx"

// VideoGallery adds no properties to the MediaGallery schema type
export type Props = BaseComponentProps<
	VideoGalleryProps,
	"VideoGallery",
	ExtractLevelProps<VideoGalleryProps, MediaGalleryProps>
>

export default function VideoGallery({
	schemaType = "VideoGallery",
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
