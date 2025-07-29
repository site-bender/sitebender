import type BaseProps from "../../../../../../types/index.ts"
import type JewelryStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/JewelryStore/index.ts"

import Store from "../index.tsx"

export type Props = JewelryStoreProps & BaseProps

export default function JewelryStore({
	_type = "JewelryStore",
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
