import type BaseProps from "../../../../../types/index.ts"
import type PaymentMethodTypeProps from "../../../../../types/Thing/Intangible/Enumeration/PaymentMethodType/index.ts"

import Enumeration from "../index.tsx"

export type Props = PaymentMethodTypeProps & BaseProps

export default function PaymentMethodType({
	_type = "PaymentMethodType",
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
		/>
	)
}
