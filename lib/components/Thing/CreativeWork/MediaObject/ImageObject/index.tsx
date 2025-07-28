import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { CreativeWorkProps } from "../../../../../types/Thing/CreativeWork/index.ts"
import type { MediaObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/index.ts"
import type { ImageObjectProps } from "../../../../../types/Thing/CreativeWork/MediaObject/ImageObject/index.ts"

import MediaObject from "../index.tsx"

export type Props = BaseComponentProps<
	ImageObjectProps,
	"ImageObject",
	ExtractLevelProps<ThingProps, CreativeWorkProps, MediaObjectProps>
>

export default function ImageObject({
	caption,
	embeddedTextCaption,
	exifData,
	representativeOfPage,
	schemaType = "ImageObject",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<MediaObject
			{...props}
			schemaType={schemaType}
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
