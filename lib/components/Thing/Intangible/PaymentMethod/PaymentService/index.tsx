import type BaseProps from "../../../../../types/index.ts"
import type PaymentServiceProps from "../../../../../types/Thing/Intangible/PaymentMethod/PaymentService/index.ts"

import PaymentMethod from "../index.tsx"

export type Props = PaymentServiceProps & BaseProps

export default function PaymentService({
	_type = "PaymentService",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PaymentMethod
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</PaymentMethod>
	)
}
