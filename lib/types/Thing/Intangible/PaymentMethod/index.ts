import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type PaymentMethodType from "../Enumeration/PaymentMethodType/index.ts"

export interface PaymentMethodProps {
	paymentMethodType?: PaymentMethodType
}

type PaymentMethod =
	& Thing
	& IntangibleProps
	& PaymentMethodProps

export default PaymentMethod
