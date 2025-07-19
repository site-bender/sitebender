import type Thing from "../../../../index.ts"
import type DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type PaymentMethod from "../../../PaymentMethod/index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"

export interface PaymentChargeSpecificationProps {
	/** The delivery method(s) to which the delivery charge or payment charge specification applies. */
	appliesToDeliveryMethod?: DeliveryMethod
	/** The payment method(s) to which the payment charge specification applies. */
	appliesToPaymentMethod?: PaymentMethod
}

type PaymentChargeSpecification =
	& Thing
	& IntangibleProps
	& PriceSpecificationProps
	& StructuredValueProps
	& PaymentChargeSpecificationProps

export default PaymentChargeSpecification
