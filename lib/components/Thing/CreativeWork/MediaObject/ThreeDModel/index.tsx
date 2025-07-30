import type BaseProps from "../../../../../types/index.ts"
import type ThreeDModelProps from "../../../../../types/Thing/CreativeWork/MediaObject/ThreeDModel/index.ts"

import MediaObject from "../index.tsx"

export type Props = ThreeDModelProps & BaseProps

export default function ThreeDModel({
	_type = "ThreeDModel",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<MediaObject
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</MediaObject>
	)
}
