import type BaseProps from "../../../../../../types/index.ts"
import type WholesaleStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/WholesaleStore/index.ts"

import Store from "../index.tsx"

export type Props = WholesaleStoreProps & BaseProps

export default function WholesaleStore({
	_type = "WholesaleStore",
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
		>
			{children}
		</Store>
	)
}
