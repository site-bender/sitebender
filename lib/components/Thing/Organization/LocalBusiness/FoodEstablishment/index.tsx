import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type FoodEstablishmentProps from "../../../../../types/Thing/FoodEstablishment/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

export type Props = BaseComponentProps<
	FoodEstablishmentProps,
	"FoodEstablishment",
	ExtractLevelProps<FoodEstablishmentProps, LocalBusinessProps>
>

export default function FoodEstablishment(
	{
		acceptsReservations,
		hasMenu,
		menu,
		servesCuisine,
		starRating,
		schemaType = "FoodEstablishment",
		subtypeProperties = {},
		...props
	}: Props,
) {
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
