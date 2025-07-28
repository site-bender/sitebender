import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { PaymentMethodProps } from "../../../../../types/Thing/Intangible/PaymentMethod/index.ts"
import type { PaymentCardProps } from "../../../../../types/Thing/Intangible/PaymentMethod/PaymentCard/index.ts"

import PaymentMethod from "../index.tsx"

export type Props = BaseComponentProps<
	PaymentCardProps,
	"PaymentCard",
	ExtractLevelProps<ThingProps, IntangibleProps, PaymentMethodProps>
>

export default function PaymentCard({
	cashBack,
	contactlessPayment,
	floorLimit,
	monthlyMinimumRepaymentAmount,
	schemaType = "PaymentCard",
	subtypeProperties = {},
	...props
}): Props {
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
