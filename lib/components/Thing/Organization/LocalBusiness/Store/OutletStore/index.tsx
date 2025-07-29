import type BaseProps from "../../../../../../types/index.ts"
import type OutletStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/OutletStore/index.ts"

import Store from "../index.tsx"

export type Props = OutletStoreProps & BaseProps

export default function OutletStore({
	_type = "OutletStore",
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
