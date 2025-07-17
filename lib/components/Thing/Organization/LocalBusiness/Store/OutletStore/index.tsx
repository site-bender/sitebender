import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type OutletStoreProps from "../../../../../../types/Thing/OutletStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// OutletStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	OutletStoreProps,
	"OutletStore",
	ExtractLevelProps<OutletStoreProps, StoreProps>
>

export default function OutletStore({
	schemaType = "OutletStore",
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
