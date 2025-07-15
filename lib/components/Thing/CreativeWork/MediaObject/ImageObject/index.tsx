import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ImageObjectProps from "../../../../../types/Thing/ImageObject/index.ts"
import type MediaObjectProps from "../../../../../types/Thing/MediaObject/index.ts"

import MediaObject from "./index.tsx"

export type Props = BaseComponentProps<
	ImageObjectProps,
	"ImageObject",
	ExtractLevelProps<ImageObjectProps, MediaObjectProps>
>

export default function ImageObject(
	{
		caption,
		embeddedTextCaption,
		exifData,
		representativeOfPage,
		schemaType = "ImageObject",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
