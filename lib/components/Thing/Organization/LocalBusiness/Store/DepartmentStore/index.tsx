import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type DepartmentStoreProps from "../../../../../../types/Thing/DepartmentStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// DepartmentStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	DepartmentStoreProps,
	"DepartmentStore",
	ExtractLevelProps<DepartmentStoreProps, StoreProps>
>

export default function DepartmentStore({
	schemaType = "DepartmentStore",
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
