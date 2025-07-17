import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type BikeStoreProps from "../../../../../../types/Thing/BikeStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// BikeStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	BikeStoreProps,
	"BikeStore",
	ExtractLevelProps<BikeStoreProps, StoreProps>
>

export default function BikeStore({
	schemaType = "BikeStore",
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
