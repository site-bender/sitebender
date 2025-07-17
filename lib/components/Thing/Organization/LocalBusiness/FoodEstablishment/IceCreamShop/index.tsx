import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FoodEstablishmentProps from "../../../../../../types/Thing/FoodEstablishment/index.ts"
import type IceCreamShopProps from "../../../../../../types/Thing/IceCreamShop/index.ts"

import FoodEstablishment from "../index.tsx"

// IceCreamShop adds no properties to the FoodEstablishment schema type
export type Props = BaseComponentProps<
	IceCreamShopProps,
	"IceCreamShop",
	ExtractLevelProps<IceCreamShopProps, FoodEstablishmentProps>
>

export default function IceCreamShop({
	schemaType = "IceCreamShop",
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
