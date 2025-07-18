import type Thing from "../../index.ts"
import type PaymentMethodType from "../Enumeration/PaymentMethodType/index.ts"
import type Intangible from "../index.ts"
import type IntangibleProps from "../index.ts"

export interface PaymentMethodProps {
	/** The type of a payment method. */
	paymentMethodType?: PaymentMethodType
}

type PaymentMethod = Thing & IntangibleProps & PaymentMethodProps

export default PaymentMethod
