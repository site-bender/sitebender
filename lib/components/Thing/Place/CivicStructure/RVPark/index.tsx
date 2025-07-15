import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type RVParkProps from "../../../../../types/Thing/RVPark/index.ts"

import CivicStructure from "./index.tsx"

// RVPark adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	RVParkProps,
	"RVPark",
	ExtractLevelProps<RVParkProps, CivicStructureProps>
>

export default function RVPark({
	schemaType = "RVPark",
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
