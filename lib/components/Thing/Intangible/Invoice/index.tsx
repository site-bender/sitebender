import type BaseProps from "../../../../types/index.ts"
import type InvoiceProps from "../../../../types/Thing/Intangible/Invoice/index.ts"

import Intangible from "../index.tsx"

export type Props = InvoiceProps & BaseProps

export default function Invoice({
	accountId,
	billingPeriod,
	broker,
	category,
	confirmationNumber,
	customer,
	minimumPaymentDue,
	paymentDue,
	paymentDueDate,
	paymentMethod,
	paymentMethodId,
	paymentStatus,
	provider,
	referencesOrder,
	scheduledPaymentDate,
	totalPaymentDue,
	_type = "Invoice",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				accountId,
				billingPeriod,
				broker,
				category,
				confirmationNumber,
				customer,
				minimumPaymentDue,
				paymentDue,
				paymentDueDate,
				paymentMethod,
				paymentMethodId,
				paymentStatus,
				provider,
				referencesOrder,
				scheduledPaymentDate,
				totalPaymentDue,
				...subtypeProperties,
			}}
		/>
	)
}
