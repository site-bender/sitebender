import type BaseProps from "../../../../../../types/index.ts"
import type BikeStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/BikeStore/index.ts"

import Store from "../index.tsx"

export type Props = BikeStoreProps & BaseProps

export default function BikeStore({
	_type = "BikeStore",
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
