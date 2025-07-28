import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../../types/Thing/Place/index.ts"
import type { AccommodationProps } from "../../../../../types/Thing/Place/Accommodation/index.ts"
import type { ApartmentProps } from "../../../../../types/Thing/Place/Accommodation/Apartment/index.ts"

import Accommodation from "../index.tsx"

export type Props = BaseComponentProps<
	ApartmentProps,
	"Apartment",
	ExtractLevelProps<ThingProps, PlaceProps, AccommodationProps>
>

export default function Apartment({
	numberOfRooms,
	occupancy,
	schemaType = "Apartment",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Accommodation
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numberOfRooms,
				occupancy,
				...subtypeProperties,
			}}
		/>
	)
}
