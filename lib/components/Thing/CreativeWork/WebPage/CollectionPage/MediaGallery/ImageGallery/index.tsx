import type BaseProps from "../../../../../../../types/index.ts"
import type ImageGalleryProps from "../../../../../../../types/Thing/CreativeWork/WebPage/CollectionPage/MediaGallery/ImageGallery/index.ts"

import MediaGallery from "../index.tsx"

export type Props = ImageGalleryProps & BaseProps

export default function ImageGallery({
	_type = "ImageGallery",
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
		>
			{children}
		</MediaGallery>
	)
}
