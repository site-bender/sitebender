import type BaseProps from "../../../../../../types/index.ts"
import type { IceCreamShopProps } from "../../../../../../types/Thing/Organization/LocalBusiness/FoodEstablishment/IceCreamShop/index.ts"

import FoodEstablishment from "../index.tsx"

export type Props = IceCreamShopProps & BaseProps

export default function IceCreamShop({
	_type = "IceCreamShop",
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
