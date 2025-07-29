import type BaseProps from "../../../../../../types/index.ts"
import type SportingGoodsStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/SportingGoodsStore/index.ts"

import Store from "../index.tsx"

export type Props = SportingGoodsStoreProps & BaseProps

export default function SportingGoodsStore({
	_type = "SportingGoodsStore",
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
