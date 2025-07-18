import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HomeGoodsStoreProps from "../../../../../../types/Thing/HomeGoodsStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// HomeGoodsStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	HomeGoodsStoreProps,
	"HomeGoodsStore",
	ExtractLevelProps<HomeGoodsStoreProps, StoreProps>
>

export default function HomeGoodsStore({
	schemaType = "HomeGoodsStore",
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
