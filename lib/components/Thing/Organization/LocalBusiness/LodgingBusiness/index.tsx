import type BaseProps from "../../../../../types/index.ts"
import type LodgingBusinessProps from "../../../../../types/Thing/Organization/LocalBusiness/LodgingBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = LodgingBusinessProps & BaseProps

export default function LodgingBusiness({
	amenityFeature,
	audience,
	availableLanguage,
	checkinTime,
	checkoutTime,
	numberOfRooms,
	petsAllowed,
	starRating,
	_type = "LodgingBusiness",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
			subtypeProperties={{
				amenityFeature,
				audience,
				availableLanguage,
				checkinTime,
				checkoutTime,
				numberOfRooms,
				petsAllowed,
				starRating,
				...subtypeProperties,
			}}
		/>
	)
}
