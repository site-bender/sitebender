import type BaseProps from "../../../../../../types/index.ts"
import type { TireShopProps } from "../../../../../../types/Thing/Organization/LocalBusiness/Store/TireShop/index.ts"

import Store from "../index.tsx"

export type Props = TireShopProps & BaseProps

export default function TireShop({
	_type = "TireShop",
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
