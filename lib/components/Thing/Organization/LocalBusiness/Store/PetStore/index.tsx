import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PetStoreProps from "../../../../../../types/Thing/PetStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// PetStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	PetStoreProps,
	"PetStore",
	ExtractLevelProps<PetStoreProps, StoreProps>
>

export default function PetStore({
	schemaType = "PetStore",
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
