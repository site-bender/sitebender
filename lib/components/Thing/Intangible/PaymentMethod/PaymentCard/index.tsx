import type BaseProps from "../../../../../types/index.ts"
import type { PaymentCardProps } from "../../../../../types/Thing/Intangible/PaymentMethod/PaymentCard/index.ts"

import PaymentMethod from "../index.tsx"

export type Props = PaymentCardProps & BaseProps

export default function PaymentCard({
	cashBack,
	contactlessPayment,
	floorLimit,
	monthlyMinimumRepaymentAmount,
	_type = "PaymentCard",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<PaymentMethod
			{...props}
			_type={_type}
			subtypeProperties={{
				cashBack,
				contactlessPayment,
				floorLimit,
				monthlyMinimumRepaymentAmount,
				...subtypeProperties,
			}}
		/>
	)
}
