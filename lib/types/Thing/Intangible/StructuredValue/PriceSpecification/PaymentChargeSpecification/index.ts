import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"
import type DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import type PaymentMethod from "../../../PaymentMethod/index.ts"

export interface PaymentChargeSpecificationProps {
	appliesToDeliveryMethod?: DeliveryMethod
	appliesToPaymentMethod?: PaymentMethod
}

type PaymentChargeSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PriceSpecificationProps
	& PaymentChargeSpecificationProps

export default PaymentChargeSpecification
