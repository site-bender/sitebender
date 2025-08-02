import type BaseProps from "../../../../../../types/index.ts"
import type HardwareStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/HardwareStore/index.ts"

import Store from "../index.tsx"

export type Props = HardwareStoreProps & BaseProps

export default function HardwareStore({
	_type = "HardwareStore",
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
