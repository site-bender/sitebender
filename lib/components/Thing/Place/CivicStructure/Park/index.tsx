import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type ParkProps from "../../../../../types/Thing/Park/index.ts"

import CivicStructure from "../index.tsx"

// Park adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	ParkProps,
	"Park",
	ExtractLevelProps<ParkProps, CivicStructureProps>
>

export default function Park({
	schemaType = "Park",
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
