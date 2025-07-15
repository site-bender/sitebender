import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ComputerStoreProps from "../../../../../../types/Thing/ComputerStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// ComputerStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	ComputerStoreProps,
	"ComputerStore",
	ExtractLevelProps<ComputerStoreProps, StoreProps>
>

export default function ComputerStore({
	schemaType = "ComputerStore",
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
