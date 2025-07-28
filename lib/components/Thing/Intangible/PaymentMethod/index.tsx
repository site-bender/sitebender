import type BaseProps from "../../../../types/index.ts"
import type { PaymentMethodProps } from "../../../../types/Thing/Intangible/PaymentMethod/index.ts"

import Intangible from "../index.tsx"

export type Props = PaymentMethodProps & BaseProps

export default function PaymentMethod({
	paymentMethodType,
	_type = "PaymentMethod",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				paymentMethodType,
				...subtypeProperties,
			}}
		/>
	)
}
