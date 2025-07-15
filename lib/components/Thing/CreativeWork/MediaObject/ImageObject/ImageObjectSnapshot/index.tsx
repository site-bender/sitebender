import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ImageObjectProps from "../../../../../../types/Thing/ImageObject/index.ts"
import type ImageObjectSnapshotProps from "../../../../../../types/Thing/ImageObjectSnapshot/index.ts"

import ImageObject from "./index.tsx"

// ImageObjectSnapshot adds no properties to the ImageObject schema type
export type Props = BaseComponentProps<
	ImageObjectSnapshotProps,
	"ImageObjectSnapshot",
	ExtractLevelProps<ImageObjectSnapshotProps, ImageObjectProps>
>

export default function ImageObjectSnapshot({
	schemaType = "ImageObjectSnapshot",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<ImageObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
