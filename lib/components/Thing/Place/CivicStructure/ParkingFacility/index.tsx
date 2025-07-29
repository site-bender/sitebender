import type BaseProps from "../../../../../types/index.ts"
import type ParkingFacilityProps from "../../../../../types/Thing/Place/CivicStructure/ParkingFacility/index.ts"

import CivicStructure from "../index.tsx"

export type Props = ParkingFacilityProps & BaseProps

export default function ParkingFacility({
	_type = "ParkingFacility",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<CivicStructure
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
