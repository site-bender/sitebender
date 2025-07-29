import type BaseProps from "../../../../../../types/index.ts"
import type CafeOrCoffeeShopProps from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/CafeOrCoffeeShop/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = CafeOrCoffeeShopProps & BaseProps

export default function CafeOrCoffeeShop({
	_type = "CafeOrCoffeeShop",
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
		/>
	)
}
