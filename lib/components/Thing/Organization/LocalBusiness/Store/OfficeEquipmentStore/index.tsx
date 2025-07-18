import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type OfficeEquipmentStoreProps from "../../../../../../types/Thing/OfficeEquipmentStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// OfficeEquipmentStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	OfficeEquipmentStoreProps,
	"OfficeEquipmentStore",
	ExtractLevelProps<OfficeEquipmentStoreProps, StoreProps>
>

export default function OfficeEquipmentStore({
	schemaType = "OfficeEquipmentStore",
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
