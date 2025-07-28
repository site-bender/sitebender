import type BaseProps from "../../../../../types/index.ts"
import type { FoodEstablishmentProps } from "../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = FoodEstablishmentProps & BaseProps

export default function FoodEstablishment({
	acceptsReservations,
	hasMenu,
	menu,
	servesCuisine,
	starRating,
	_type = "FoodEstablishment",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<LocalBusiness
			{...props}
			_type={_type}
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
