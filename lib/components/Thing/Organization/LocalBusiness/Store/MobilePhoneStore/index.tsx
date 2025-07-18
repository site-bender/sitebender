import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type MobilePhoneStoreProps from "../../../../../../types/Thing/MobilePhoneStore/index.ts"
import type StoreProps from "../../../../../../types/Thing/Store/index.ts"

import Store from "../index.tsx"

// MobilePhoneStore adds no properties to the Store schema type
export type Props = BaseComponentProps<
	MobilePhoneStoreProps,
	"MobilePhoneStore",
	ExtractLevelProps<MobilePhoneStoreProps, StoreProps>
>

export default function MobilePhoneStore({
	schemaType = "MobilePhoneStore",
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
