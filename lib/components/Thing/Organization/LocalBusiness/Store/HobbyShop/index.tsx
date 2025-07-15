import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HobbyShopProps from "../../../../../../types/Thing/HobbyShop/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// HobbyShop adds no properties to the Store schema type
export type Props = BaseComponentProps<
	HobbyShopProps,
	"HobbyShop",
	ExtractLevelProps<HobbyShopProps, StoreProps>
>

export default function HobbyShop({
	schemaType = "HobbyShop",
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
