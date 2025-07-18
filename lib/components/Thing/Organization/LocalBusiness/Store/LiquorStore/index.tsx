import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type LiquorStoreProps from "../../../../../../types/Thing/LiquorStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// LiquorStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	LiquorStoreProps,
	"LiquorStore",
	ExtractLevelProps<LiquorStoreProps, StoreProps>
>

export default function LiquorStore({
	schemaType = "LiquorStore",
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
