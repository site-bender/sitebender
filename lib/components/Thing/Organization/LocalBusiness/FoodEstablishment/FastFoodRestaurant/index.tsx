import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FastFoodRestaurantProps from "../../../../../../types/Thing/FastFoodRestaurant/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"

import FoodEstablishment from "./index.tsx"

// FastFoodRestaurant adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	FastFoodRestaurantProps,
	"FastFoodRestaurant",
	ExtractLevelProps<FastFoodRestaurantProps, FoodEstablishmentProps>
>

export default function FastFoodRestaurant({
	schemaType = "FastFoodRestaurant",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<FoodEstablishment
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
