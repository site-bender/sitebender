import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type PaymentCardProps from "../../../../../types/Thing/PaymentCard/index.ts"
import type PaymentMethodProps from "../../../../../types/Thing/PaymentMethod/index.ts"

import PaymentMethod from "./index.tsx"

export type Props = BaseComponentProps<
	PaymentCardProps,
	"PaymentCard",
	ExtractLevelProps<PaymentCardProps, PaymentMethodProps>
>

export default function PaymentCard(
	{
		cashBack,
		contactlessPayment,
		floorLimit,
		monthlyMinimumRepaymentAmount,
		schemaType = "PaymentCard",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<PaymentMethod
			{...props}
			schemaType={schemaType}
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
