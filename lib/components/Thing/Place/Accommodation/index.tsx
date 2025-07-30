import type BaseProps from "../../../../types/index.ts"
import type AccommodationProps from "../../../../types/Thing/Place/Accommodation/index.ts"

import Place from "../index.tsx"

export type Props = AccommodationProps & BaseProps

export default function Accommodation({
	accommodationCategory,
	accommodationFloorPlan,
	amenityFeature,
	bed,
	floorLevel,
	floorSize,
	leaseLength,
	numberOfBathroomsTotal,
	numberOfBedrooms,
	numberOfFullBathrooms,
	numberOfPartialBathrooms,
	numberOfRooms,
	occupancy,
	permittedUsage,
	petsAllowed,
	tourBookingPage,
	yearBuilt,
	_type = "Accommodation",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Place
			{...props}
			_type={_type}
			subtypeProperties={{
				accommodationCategory,
				accommodationFloorPlan,
				amenityFeature,
				bed,
				floorLevel,
				floorSize,
				leaseLength,
				numberOfBathroomsTotal,
				numberOfBedrooms,
				numberOfFullBathrooms,
				numberOfPartialBathrooms,
				numberOfRooms,
				occupancy,
				permittedUsage,
				petsAllowed,
				tourBookingPage,
				yearBuilt,
				...subtypeProperties,
			}}
		>{children}</Place>
	)
}
