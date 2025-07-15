import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CafeOrCoffeeShopProps from "../../../../../../types/Thing/CafeOrCoffeeShop/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"

import FoodEstablishment from "./index.tsx"

// CafeOrCoffeeShop adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	CafeOrCoffeeShopProps,
	"CafeOrCoffeeShop",
	ExtractLevelProps<CafeOrCoffeeShopProps, FoodEstablishmentProps>
>

export default function CafeOrCoffeeShop({
	schemaType = "CafeOrCoffeeShop",
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
