import type BaseProps from "../../../../../../types/index.ts"
import type { MensClothingStoreProps } from "../../../../../../types/Thing/Organization/LocalBusiness/Store/MensClothingStore/index.ts"

import Store from "../index.tsx"

export type Props = MensClothingStoreProps & BaseProps

export default function MensClothingStore({
	_type = "MensClothingStore",
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
