import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type SculptureProps from "../../../../types/Thing/Sculpture/index.ts"

import CreativeWork from "./index.tsx"

// Sculpture adds no properties to the CreativeWork schema type
export type Props = BaseComponentProps<
	SculptureProps,
	"Sculpture",
	ExtractLevelProps<SculptureProps, CreativeWorkProps>
>

export default function Sculpture({
	schemaType = "Sculpture",
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
