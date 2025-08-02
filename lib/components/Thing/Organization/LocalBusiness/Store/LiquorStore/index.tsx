import type BaseProps from "../../../../../../types/index.ts"
import type LiquorStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/LiquorStore/index.ts"

import Store from "../index.tsx"

export type Props = LiquorStoreProps & BaseProps

export default function LiquorStore({
	_type = "LiquorStore",
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
