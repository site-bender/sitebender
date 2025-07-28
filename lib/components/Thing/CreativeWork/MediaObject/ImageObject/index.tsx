import type BaseProps from "../../../../../types/index.ts"
import type { ImageObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/ImageObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = ImageObjectProps & BaseProps

export default function ImageObject({
	caption,
	embeddedTextCaption,
	exifData,
	representativeOfPage,
	_type = "ImageObject",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MediaObject
			{...props}
			_type={_type}
			subtypeProperties={{
				caption,
				embeddedTextCaption,
				exifData,
				representativeOfPage,
				...subtypeProperties,
			}}
		/>
	)
}
