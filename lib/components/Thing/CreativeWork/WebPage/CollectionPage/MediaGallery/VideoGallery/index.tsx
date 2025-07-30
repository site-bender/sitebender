import type BaseProps from "../../../../../../../types/index.ts"
import type VideoGalleryProps from "../../../../../../../types/Thing/CreativeWork/WebPage/CollectionPage/MediaGallery/VideoGallery/index.ts"

import MediaGallery from "../index.tsx"

export type Props = VideoGalleryProps & BaseProps

export default function VideoGallery({
	_type = "VideoGallery",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MediaGallery
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MediaGallery>
	)
}
