import type BaseProps from "../../../../../../types/index.ts"
import type HobbyShopProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/HobbyShop/index.ts"

import Store from "../index.tsx"

export type Props = HobbyShopProps & BaseProps

export default function HobbyShop({
	_type = "HobbyShop",
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
		>{children}</Store>
	)
}
