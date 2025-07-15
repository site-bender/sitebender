import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type AccommodationProps from "../../../../types/Thing/Accommodation/index.ts"
import type PlaceProps from "../../../../types/Thing/Place/index.ts"

import Place from "./index.tsx"

export type Props = BaseComponentProps<
	AccommodationProps,
	"Accommodation",
	ExtractLevelProps<AccommodationProps, PlaceProps>
>

export default function Accommodation(
	{
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
		schemaType = "Accommodation",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Place
			{...props}
			schemaType={schemaType}
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
		/>
	)
}
