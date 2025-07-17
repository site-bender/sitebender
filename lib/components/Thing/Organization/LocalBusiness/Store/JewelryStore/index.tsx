import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type JewelryStoreProps from "../../../../../../types/Thing/JewelryStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// JewelryStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	JewelryStoreProps,
	"JewelryStore",
	ExtractLevelProps<JewelryStoreProps, StoreProps>
>

export default function JewelryStore({
	schemaType = "JewelryStore",
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
