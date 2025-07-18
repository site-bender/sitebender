import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type GardenStoreProps from "../../../../../../types/Thing/GardenStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// GardenStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	GardenStoreProps,
	"GardenStore",
	ExtractLevelProps<GardenStoreProps, StoreProps>
>

export default function GardenStore({
	schemaType = "GardenStore",
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
