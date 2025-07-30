import type BaseProps from "../../../../../../types/index.ts"
import type RestaurantProps from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/Restaurant/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = RestaurantProps & BaseProps

export default function Restaurant({
	_type = "Restaurant",
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
		>{children}</FoodEstablishment>
	)
}
