import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"
import type InvoiceProps from "../../../../types/Thing/Invoice/index.ts"

import Intangible from "./index.tsx"

export type Props = BaseComponentProps<
	InvoiceProps,
	"Invoice",
	ExtractLevelProps<InvoiceProps, IntangibleProps>
>

export default function Invoice(
	{
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
		schemaType = "Invoice",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
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
