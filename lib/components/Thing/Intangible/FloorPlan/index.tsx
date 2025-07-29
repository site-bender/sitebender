import type BaseProps from "../../../../types/index.ts"
import type FloorPlanProps from "../../../../types/Thing/Intangible/FloorPlan/index.ts"

import Intangible from "../index.tsx"

export type Props = FloorPlanProps & BaseProps

export default function FloorPlan({
	amenityFeature,
	floorSize,
	isPlanForApartment,
	layoutImage,
	numberOfAccommodationUnits,
	numberOfAvailableAccommodationUnits,
	numberOfBathroomsTotal,
	numberOfBedrooms,
	numberOfFullBathrooms,
	numberOfPartialBathrooms,
	numberOfRooms,
	petsAllowed,
	_type = "FloorPlan",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				amenityFeature,
				floorSize,
				isPlanForApartment,
				layoutImage,
				numberOfAccommodationUnits,
				numberOfAvailableAccommodationUnits,
				numberOfBathroomsTotal,
				numberOfBedrooms,
				numberOfFullBathrooms,
				numberOfPartialBathrooms,
				numberOfRooms,
				petsAllowed,
				...subtypeProperties,
			}}
		/>
	)
}
