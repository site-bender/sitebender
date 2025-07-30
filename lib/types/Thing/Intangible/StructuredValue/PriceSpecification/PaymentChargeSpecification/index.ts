import type Thing from "../../../../index.ts"
import type DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type PaymentMethod from "../../../PaymentMethod/index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"

import DeliveryMethodComponent from "../../../../../../components/Thing/Intangible/Enumeration/DeliveryMethod/index.ts"
import PaymentMethodComponent from "../../../../../../components/Thing/Intangible/PaymentMethod/index.ts"

export interface PaymentChargeSpecificationProps {
	"@type"?: "PaymentChargeSpecification"
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
