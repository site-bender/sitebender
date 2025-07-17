import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MensClothingStoreProps from "../../../../../../types/Thing/MensClothingStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// MensClothingStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	MensClothingStoreProps,
	"MensClothingStore",
	ExtractLevelProps<MensClothingStoreProps, StoreProps>
>

export default function MensClothingStore({
	schemaType = "MensClothingStore",
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
