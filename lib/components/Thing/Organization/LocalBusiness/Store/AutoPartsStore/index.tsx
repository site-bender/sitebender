import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AutoPartsStoreProps from "../../../../../../types/Thing/AutoPartsStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// AutoPartsStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	AutoPartsStoreProps,
	"AutoPartsStore",
	ExtractLevelProps<AutoPartsStoreProps, StoreProps>
>

export default function AutoPartsStore({
	schemaType = "AutoPartsStore",
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
