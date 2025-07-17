import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CivicStructureProps from "../../../../../types/Thing/CivicStructure/index.ts"
import type ParkingFacilityProps from "../../../../../types/Thing/ParkingFacility/index.ts"

import CivicStructure from "../index.tsx"

// ParkingFacility adds no properties to the CivicStructure schema type
export type Props = BaseComponentProps<
	ParkingFacilityProps,
	"ParkingFacility",
	ExtractLevelProps<ParkingFacilityProps, CivicStructureProps>
>

export default function ParkingFacility({
	schemaType = "ParkingFacility",
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
