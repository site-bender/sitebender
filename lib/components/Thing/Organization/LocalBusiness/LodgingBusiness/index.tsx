import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type LodgingBusinessProps from "../../../../../types/Thing/LodgingBusiness/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = BaseComponentProps<
	LodgingBusinessProps,
	"LodgingBusiness",
	ExtractLevelProps<LodgingBusinessProps, LocalBusinessProps>
>

export default function LodgingBusiness(
	{
		amenityFeature,
		audience,
		availableLanguage,
		checkinTime,
		checkoutTime,
		numberOfRooms,
		petsAllowed,
		starRating,
		schemaType = "LodgingBusiness",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
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
