import DeliveryMethod from "../../../Enumeration/DeliveryMethod/index.ts"
import PaymentMethod from "../../../PaymentMethod/index.ts"
import PriceSpecification from "../index.ts"

export default interface PaymentChargeSpecification extends PriceSpecification {
	/** The delivery method(s) to which the delivery charge or payment charge specification applies. */
	appliesToDeliveryMethod?: DeliveryMethod
	/** The payment method(s) to which the payment charge specification applies. */
	appliesToPaymentMethod?: PaymentMethod
}
