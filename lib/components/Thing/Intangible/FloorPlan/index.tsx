import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { FloorPlanProps } from "../../../../types/Thing/Intangible/FloorPlan/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	FloorPlanProps,
	"FloorPlan",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

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
	schemaType = "FloorPlan",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
