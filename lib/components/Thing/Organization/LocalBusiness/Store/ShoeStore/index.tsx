import type BaseProps from "../../../../../../types/index.ts"
import type { ShoeStoreProps } from "../../../../../../types/Thing/Organization/LocalBusiness/Store/ShoeStore/index.ts"

import Store from "../index.tsx"

export type Props = ShoeStoreProps & BaseProps

export default function ShoeStore({
	_type = "ShoeStore",
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
