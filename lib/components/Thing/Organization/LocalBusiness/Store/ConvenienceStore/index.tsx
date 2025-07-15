import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ConvenienceStoreProps from "../../../../../../types/Thing/ConvenienceStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "./index.tsx"

// ConvenienceStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	ConvenienceStoreProps,
	"ConvenienceStore",
	ExtractLevelProps<ConvenienceStoreProps, StoreProps>
>

export default function ConvenienceStore({
	schemaType = "ConvenienceStore",
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
