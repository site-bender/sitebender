import type BaseProps from "../../../../../types/index.ts"
import type PurchaseTypeProps from "../../../../../types/Thing/Intangible/Enumeration/PurchaseType/index.ts"

import Enumeration from "../index.tsx"

export type Props = PurchaseTypeProps & BaseProps

export default function PurchaseType({
	_type = "PurchaseType",
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
