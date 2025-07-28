import type { BaseComponentProps, ExtractLevelProps } from "../../../../../../types/index.ts"
import type ThingProps from "../../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { PriceSpecificationProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/index.ts"
import type { PaymentChargeSpecificationProps } from "../../../../../../types/Thing/Intangible/StructuredValue/PriceSpecification/PaymentChargeSpecification/index.ts"

import PriceSpecification from "../index.tsx"

export type Props = BaseComponentProps<
	PaymentChargeSpecificationProps,
	"PaymentChargeSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps, PriceSpecificationProps>
>

export default function PaymentChargeSpecification({
	appliesToDeliveryMethod,
	appliesToPaymentMethod,
	schemaType = "PaymentChargeSpecification",
	subtypeProperties = {},
	...props
}): Props {
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
