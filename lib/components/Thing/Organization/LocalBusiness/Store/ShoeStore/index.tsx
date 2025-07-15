import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ShoeStoreProps from "../../../../../../types/Thing/ShoeStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// ShoeStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	ShoeStoreProps,
	"ShoeStore",
	ExtractLevelProps<ShoeStoreProps, StoreProps>
>

export default function ShoeStore({
	schemaType = "ShoeStore",
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
