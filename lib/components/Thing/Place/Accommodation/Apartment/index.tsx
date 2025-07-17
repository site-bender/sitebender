import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type AccommodationProps from "../../../../../types/Thing/Accommodation/index.ts"
import type ApartmentProps from "../../../../../types/Thing/Apartment/index.ts"

import Accommodation from "../index.tsx"

export type Props = BaseComponentProps<
	ApartmentProps,
	"Apartment",
	ExtractLevelProps<ApartmentProps, AccommodationProps>
>

export default function Apartment(
	{
		numberOfRooms,
		occupancy,
		schemaType = "Apartment",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
