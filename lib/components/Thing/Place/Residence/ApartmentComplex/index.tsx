import type BaseProps from "../../../../../types/index.ts"
import type { ApartmentComplexProps } from "../../../../../types/Thing/Place/Residence/ApartmentComplex/index.ts"

import Residence from "../index.tsx"

export type Props = ApartmentComplexProps & BaseProps

export default function ApartmentComplex({
	numberOfAccommodationUnits,
	numberOfAvailableAccommodationUnits,
	numberOfBedrooms,
	petsAllowed,
	tourBookingPage,
	_type = "ApartmentComplex",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Residence
			{...props}
			_type={_type}
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
