import type BaseProps from "../../../../../../types/index.ts"
import type PaymentChargeSpecificationProps from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/PaymentChargeSpecification/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = PaymentChargeSpecificationProps & BaseProps

export default function PaymentChargeSpecification({
	appliesToDeliveryMethod,
	appliesToPaymentMethod,
	_type = "PaymentChargeSpecification",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PriceSpecification
			{...props}
			_type={_type}
			subtypeProperties={{
				appliesToDeliveryMethod,
				appliesToPaymentMethod,
				...subtypeProperties,
			}}
		>
			{children}
		</PriceSpecification>
	)
}
