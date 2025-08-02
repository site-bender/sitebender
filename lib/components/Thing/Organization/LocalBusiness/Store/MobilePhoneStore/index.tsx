import type BaseProps from "../../../../../../types/index.ts"
import type MobilePhoneStoreProps from "../../../../../../types/Thing/Organization/LocalBusiness/Store/MobilePhoneStore/index.ts"

import Store from "../index.tsx"

export type Props = MobilePhoneStoreProps & BaseProps

export default function MobilePhoneStore({
	_type = "MobilePhoneStore",
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
