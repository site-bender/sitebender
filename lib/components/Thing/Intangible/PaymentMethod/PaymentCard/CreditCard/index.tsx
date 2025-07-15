import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type CreditCardProps from "../../../../../../types/Thing/CreditCard/index.ts"
import type PaymentCardProps from "../../../../../../types/Thing/PaymentCard/index.ts"

import PaymentCard from "./index.tsx"

// CreditCard adds no properties to the PaymentCard schema type
export type Props = BaseComponentProps<
	CreditCardProps,
	"CreditCard",
	ExtractLevelProps<CreditCardProps, PaymentCardProps>
>

export default function CreditCard({
	schemaType = "CreditCard",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<PaymentCard
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
