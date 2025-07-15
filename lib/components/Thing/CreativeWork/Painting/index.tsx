import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type PaintingProps from "../../../../types/Thing/Painting/index.ts"

import CreativeWork from "./index.tsx"

// Painting adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	PaintingProps,
	"Painting",
	ExtractLevelProps<PaintingProps, CreativeWorkProps>
>

export default function Painting({
	schemaType = "Painting",
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
