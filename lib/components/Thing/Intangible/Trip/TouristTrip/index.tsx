import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type TouristTripProps from "../../../../../types/Thing/TouristTrip/index.ts"
import type TripProps from "../../../../../types/Thing/Trip/index.ts"

import Trip from "./index.tsx"

export type Props = BaseComponentProps<
	TouristTripProps,
	"TouristTrip",
	ExtractLevelProps<TouristTripProps, TripProps>
>

export default function TouristTrip(
	{
		touristType,
		schemaType = "TouristTrip",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Trip
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				touristType,
				...subtypeProperties,
			}}
		/>
	)
}
