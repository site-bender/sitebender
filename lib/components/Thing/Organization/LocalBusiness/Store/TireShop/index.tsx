import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"
import type TireShopProps from "../../../../../../types/Thing/TireShop/index.ts"

import Store from "./index.tsx"

// TireShop adds no properties to the Store schema type
export type Props = BaseComponentProps<
	TireShopProps,
	"TireShop",
	ExtractLevelProps<TireShopProps, StoreProps>
>

export default function TireShop({
	schemaType = "TireShop",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Store
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
