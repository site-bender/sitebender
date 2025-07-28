import type BaseProps from "../../../../../../types/index.ts"
import type { FurnitureStoreProps } from "../../../../../../types/Thing/Organization/LocalBusiness/Store/FurnitureStore/index.ts"

import Store from "../index.tsx"

export type Props = FurnitureStoreProps & BaseProps

export default function FurnitureStore({
	_type = "FurnitureStore",
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
