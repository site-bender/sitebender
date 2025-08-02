import type BaseProps from "../../../../../../types/index.ts"
import type FastFoodRestaurantProps from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/FastFoodRestaurant/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = FastFoodRestaurantProps & BaseProps

export default function FastFoodRestaurant({
	_type = "FastFoodRestaurant",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<FoodEstablishment
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</FoodEstablishment>
	)
}
