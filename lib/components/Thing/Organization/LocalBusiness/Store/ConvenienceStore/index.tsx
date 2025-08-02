import type BaseProps from "../../../../../../types/index.ts"
import type ConvenienceStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/ConvenienceStore/index.ts"

import Store from "../index.tsx"

export type Props = ConvenienceStoreProps & BaseProps

export default function ConvenienceStore({
	_type = "ConvenienceStore",
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
