import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ElectronicsStoreProps from "../../../../../../types/Thing/ElectronicsStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// ElectronicsStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	ElectronicsStoreProps,
	"ElectronicsStore",
	ExtractLevelProps<ElectronicsStoreProps, StoreProps>
>

export default function ElectronicsStore({
	schemaType = "ElectronicsStore",
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
