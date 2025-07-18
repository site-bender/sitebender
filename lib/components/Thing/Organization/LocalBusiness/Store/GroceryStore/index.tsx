import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type GroceryStoreProps from "../../../../../../types/Thing/GroceryStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// GroceryStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	GroceryStoreProps,
	"GroceryStore",
	ExtractLevelProps<GroceryStoreProps, StoreProps>
>

export default function GroceryStore({
	schemaType = "GroceryStore",
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
