import type BaseProps from "../../../../../../types/index.ts"
import type AutoPartsStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/AutoPartsStore/index.ts"

import Store from "../index.tsx"

// AutoPartsStore adds no properties to the ListItem schema type
export type Props = AutoPartsStoreProps & BaseProps

export default function AutoPartsStore({
	_type = "AutoPartsStore",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<Store
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>
			{children}
		</Store>
	)
}
