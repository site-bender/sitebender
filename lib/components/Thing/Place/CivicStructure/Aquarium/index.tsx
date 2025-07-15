import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AquariumProps from "../../../../../types/Thing/Aquarium/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"

import CivicStructure from "./index.tsx"

// Aquarium adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	AquariumProps,
	"Aquarium",
	ExtractLevelProps<AquariumProps, CivicStructureProps>
>

export default function Aquarium({
	schemaType = "Aquarium",
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
