import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"
import type WholesaleStoreProps from "../../../../../../types/Thing/WholesaleStore/index.ts"

import Store from "./index.tsx"

// WholesaleStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	WholesaleStoreProps,
	"WholesaleStore",
	ExtractLevelProps<WholesaleStoreProps, StoreProps>
>

export default function WholesaleStore({
	schemaType = "WholesaleStore",
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
