import type BaseProps from "../../../../../../types/index.ts"
import type PawnShopProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/PawnShop/index.ts"

import Store from "../index.tsx"

export type Props = PawnShopProps & BaseProps

export default function PawnShop({
	_type = "PawnShop",
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
