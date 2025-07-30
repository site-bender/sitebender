import type BaseProps from "../../../../../../types/index.ts"
import type CreditCardProps from "../../../../../../types/Thing/Intangible/PaymentMethod/PaymentCard/CreditCard/index.ts"

import PaymentCard from "../index.tsx"

export type Props = CreditCardProps & BaseProps

export default function CreditCard({
	_type = "CreditCard",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PaymentCard
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>{children}</PaymentCard>
	)
}
