import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PawnShopProps from "../../../../../../types/Thing/PawnShop/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// PawnShop adds no properties to the Store schema type
export type Props = BaseComponentProps<
	PawnShopProps,
	"PawnShop",
	ExtractLevelProps<PawnShopProps, StoreProps>
>

export default function PawnShop({
	schemaType = "PawnShop",
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
