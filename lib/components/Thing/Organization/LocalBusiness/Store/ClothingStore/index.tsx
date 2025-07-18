import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ClothingStoreProps from "../../../../../../types/Thing/ClothingStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// ClothingStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	ClothingStoreProps,
	"ClothingStore",
	ExtractLevelProps<ClothingStoreProps, StoreProps>
>

export default function ClothingStore({
	schemaType = "ClothingStore",
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
