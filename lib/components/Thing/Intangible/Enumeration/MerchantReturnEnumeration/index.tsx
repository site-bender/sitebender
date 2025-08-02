import type BaseProps from "../../../../../types/index.ts"
import type MerchantReturnEnumerationProps from "../../../../../types/Thing/Intangible/Enumeration/MerchantReturnEnumeration/index.ts"

import Enumeration from "../index.tsx"

export type Props = MerchantReturnEnumerationProps & BaseProps

export default function MerchantReturnEnumeration({
	_type = "MerchantReturnEnumeration",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</Enumeration>
	)
}
