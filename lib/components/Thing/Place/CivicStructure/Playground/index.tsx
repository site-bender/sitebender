import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type PlaygroundProps from "../../../../../types/Thing/Playground/index.ts"

import CivicStructure from "./index.tsx"

// Playground adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	PlaygroundProps,
	"Playground",
	ExtractLevelProps<PlaygroundProps, CivicStructureProps>
>

export default function Playground({
	schemaType = "Playground",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<CivicStructure
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
