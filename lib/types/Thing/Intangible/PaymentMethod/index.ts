import PaymentMethodType from "../Enumeration/PaymentMethodType/index.ts"
import Intangible from "../index.ts"

export default interface PaymentMethod extends Intangible {
	/** The type of a payment method. */
	paymentMethodType?: PaymentMethodType
}
