import type BaseProps from "../../../../../../types/index.ts"
import type GroceryStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/GroceryStore/index.ts"

import Store from "../index.tsx"

export type Props = GroceryStoreProps & BaseProps

export default function GroceryStore({
	_type = "GroceryStore",
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
		/>
	)
}
