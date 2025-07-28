import type BaseProps from "../../../../../../types/index.ts"
import type { HomeGoodsStoreProps } from "../../../../../../types/Thing/Organization/LocalBusiness/Store/HomeGoodsStore/index.ts"

import Store from "../index.tsx"

export type Props = HomeGoodsStoreProps & BaseProps

export default function HomeGoodsStore({
	_type = "HomeGoodsStore",
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
