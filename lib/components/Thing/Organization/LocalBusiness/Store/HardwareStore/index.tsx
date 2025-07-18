import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HardwareStoreProps from "../../../../../../types/Thing/HardwareStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// HardwareStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	HardwareStoreProps,
	"HardwareStore",
	ExtractLevelProps<HardwareStoreProps, StoreProps>
>

export default function HardwareStore({
	schemaType = "HardwareStore",
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
