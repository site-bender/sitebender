import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type MediaObjectProps from "../../../../../types/Thing/MediaObject/index.ts"
import type ThreeDModelProps from "../../../../../types/Thing/ThreeDModel/index.ts"

import MediaObject from "../index.tsx"

export type Props = BaseComponentProps<
	ThreeDModelProps,
	"ThreeDModel",
	ExtractLevelProps<ThreeDModelProps, MediaObjectProps>
>

export default function ThreeDModel(
	{
		isResizable,
		schemaType = "ThreeDModel",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MediaObject
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				isResizable,
				...subtypeProperties,
			}}
		/>
	)
}
