import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { PlaceProps } from "../../../../../types/Thing/Place/index.ts"
import type { ResidenceProps } from "../../../../../types/Thing/Place/Residence/index.ts"
import type { ApartmentComplexProps } from "../../../../../types/Thing/Place/Residence/ApartmentComplex/index.ts"

import Residence from "../index.tsx"

export type Props = BaseComponentProps<
	ApartmentComplexProps,
	"ApartmentComplex",
	ExtractLevelProps<ThingProps, PlaceProps, ResidenceProps>
>

export default function ApartmentComplex({
	numberOfAccommodationUnits,
	numberOfAvailableAccommodationUnits,
	numberOfBedrooms,
	petsAllowed,
	tourBookingPage,
	schemaType = "ApartmentComplex",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Residence
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				numberOfAccommodationUnits,
				numberOfAvailableAccommodationUnits,
				numberOfBedrooms,
				petsAllowed,
				tourBookingPage,
				...subtypeProperties,
			}}
		/>
	)
}
