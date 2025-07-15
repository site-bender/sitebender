import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"
import type ToyStoreProps from "../../../../../../types/Thing/ToyStore/index.ts"

import Store from "./index.tsx"

// ToyStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	ToyStoreProps,
	"ToyStore",
	ExtractLevelProps<ToyStoreProps, StoreProps>
>

export default function ToyStore({
	schemaType = "ToyStore",
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
