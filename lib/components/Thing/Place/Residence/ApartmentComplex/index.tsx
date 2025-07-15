import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type ApartmentComplexProps from "../../../../../types/Thing/ApartmentComplex/index.ts"
import type ResidenceProps from "../../../../../types/Thing/Residence/index.ts"

import Residence from "./index.tsx"

export type Props = BaseComponentProps<
	ApartmentComplexProps,
	"ApartmentComplex",
	ExtractLevelProps<ApartmentComplexProps, ResidenceProps>
>

export default function ApartmentComplex(
	{
		numberOfAccommodationUnits,
		numberOfAvailableAccommodationUnits,
		numberOfBedrooms,
		petsAllowed,
		tourBookingPage,
		schemaType = "ApartmentComplex",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
