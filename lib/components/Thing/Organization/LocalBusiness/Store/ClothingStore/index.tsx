import type BaseProps from "../../../../../../types/index.ts"
import type { ClothingStoreProps } from "../../../../../../types/Thing/Organization/LocalBusiness/Store/ClothingStore/index.ts"

import Store from "../index.tsx"

export type Props = ClothingStoreProps & BaseProps

export default function ClothingStore({
	_type = "ClothingStore",
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
