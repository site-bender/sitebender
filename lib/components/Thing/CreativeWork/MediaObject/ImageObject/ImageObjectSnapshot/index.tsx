import type BaseProps from "../../../../../../types/index.ts"
import type ImageObjectSnapshotProps from "../../../../../../types/Thing/CreativeWork/MediaObject/ImageObject/ImageObjectSnapshot/index.ts"

import ImageObject from "../index.tsx"

export type Props = ImageObjectSnapshotProps & BaseProps

export default function ImageObjectSnapshot({
	_type = "ImageObjectSnapshot",
	children,
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
		>{children}</ImageObject>
	)
}
