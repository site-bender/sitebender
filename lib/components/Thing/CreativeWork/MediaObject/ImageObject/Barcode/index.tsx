import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BarcodeProps from "../../../../../../types/Thing/Barcode/index.ts"
import type ImageObjectProps from "../../../../../../types/Thing/ImageObject/index.ts"

import ImageObject from "../index.tsx"

// Barcode adds no properties to the ImageObject schema type
export type Props = BaseComponentProps<
	BarcodeProps,
	"Barcode",
	ExtractLevelProps<BarcodeProps, ImageObjectProps>
>

export default function Barcode({
	schemaType = "Barcode",
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
