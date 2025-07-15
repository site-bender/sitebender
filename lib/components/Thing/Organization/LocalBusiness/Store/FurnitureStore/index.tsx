import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type FurnitureStoreProps from "../../../../../../types/Thing/FurnitureStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// FurnitureStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	FurnitureStoreProps,
	"FurnitureStore",
	ExtractLevelProps<FurnitureStoreProps, StoreProps>
>

export default function FurnitureStore({
	schemaType = "FurnitureStore",
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
