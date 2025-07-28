import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { OrganizationProps } from "../../../../../types/Thing/Organization/index.ts"
import type { LocalBusinessProps } from "../../../../../types/Thing/Organization/LocalBusiness/index.ts"
import type { FoodEstablishmentProps } from "../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = BaseComponentProps<
	FoodEstablishmentProps,
	"FoodEstablishment",
	ExtractLevelProps<ThingProps, OrganizationProps, LocalBusinessProps>
>

export default function FoodEstablishment({
	acceptsReservations,
	hasMenu,
	menu,
	servesCuisine,
	starRating,
	schemaType = "FoodEstablishment",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				acceptsReservations,
				hasMenu,
				menu,
				servesCuisine,
				starRating,
				...subtypeProperties,
			}}
		/>
	)
}
