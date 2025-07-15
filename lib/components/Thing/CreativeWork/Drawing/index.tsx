import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type DrawingProps from "../../../../types/Thing/Drawing/index.ts"

import CreativeWork from "./index.tsx"

// Drawing adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	DrawingProps,
	"Drawing",
	ExtractLevelProps<DrawingProps, CreativeWorkProps>
>

export default function Drawing({
	schemaType = "Drawing",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
