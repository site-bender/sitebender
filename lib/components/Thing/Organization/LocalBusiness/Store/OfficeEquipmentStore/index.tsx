import type BaseProps from "../../../../../../types/index.ts"
import type OfficeEquipmentStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/OfficeEquipmentStore/index.ts"

import Store from "../index.tsx"

export type Props = OfficeEquipmentStoreProps & BaseProps

export default function OfficeEquipmentStore({
	_type = "OfficeEquipmentStore",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Store
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Store>
	)
}
