import type BaseProps from "../../../../../../types/index.ts"
import type BarcodeProps from "../../../../../../types/Thing/CreativeWork/MediaObject/ImageObject/Barcode/index.ts"

import ImageObject from "../index.tsx"

export type Props = BarcodeProps & BaseProps

export default function Barcode({
	_type = "Barcode",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<ImageObject
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
