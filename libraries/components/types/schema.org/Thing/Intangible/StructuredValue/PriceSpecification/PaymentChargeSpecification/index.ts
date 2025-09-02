import type Thing from "../../../../index.ts"
import type DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type PaymentMethod from "../../../PaymentMethod/index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"

import { DeliveryMethod as DeliveryMethodComponent } from "../../../../../../../components/index.tsx"
import { PaymentMethod as PaymentMethodComponent } from "../../../../../../../components/index.tsx"

export type PaymentChargeSpecificationType = "PaymentChargeSpecification"

export interface PaymentChargeSpecificationProps {
	"@type"?: PaymentChargeSpecificationType
	appliesToDeliveryMethod?:
		| DeliveryMethod
		| ReturnType<typeof DeliveryMethodComponent>
	appliesToPaymentMethod?:
		| PaymentMethod
		| ReturnType<typeof PaymentMethodComponent>
}

type PaymentChargeSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PriceSpecificationProps
	& PaymentChargeSpecificationProps

export default PaymentChargeSpecification
