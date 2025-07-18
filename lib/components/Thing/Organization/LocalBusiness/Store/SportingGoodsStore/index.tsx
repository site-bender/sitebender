import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type SportingGoodsStoreProps from "../../../../../../types/Thing/SportingGoodsStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// SportingGoodsStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	SportingGoodsStoreProps,
	"SportingGoodsStore",
	ExtractLevelProps<SportingGoodsStoreProps, StoreProps>
>

export default function SportingGoodsStore({
	schemaType = "SportingGoodsStore",
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
