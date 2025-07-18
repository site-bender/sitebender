import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"
import type RestaurantProps from "../../../../../../types/Thing/Restaurant/index.ts"

import FoodEstablishment from "../index.tsx"

// Restaurant adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	RestaurantProps,
	"Restaurant",
	ExtractLevelProps<RestaurantProps, FoodEstablishmentProps>
>

export default function Restaurant({
	schemaType = "Restaurant",
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
