import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type PaymentChargeSpecificationProps from "../../../../../../types/Thing/PaymentChargeSpecification/index.ts"
import type PriceSpecificationProps from "../../../../../../types/Thing/PriceSpecification/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = BaseComponentProps<
	PaymentChargeSpecificationProps,
	"PaymentChargeSpecification",
	ExtractLevelProps<PaymentChargeSpecificationProps, PriceSpecificationProps>
>

export default function PaymentChargeSpecification(
	{
		appliesToDeliveryMethod,
		appliesToPaymentMethod,
		schemaType = "PaymentChargeSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<PriceSpecification
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				appliesToDeliveryMethod,
				appliesToPaymentMethod,
				...subtypeProperties,
			}}
		/>
	)
}
