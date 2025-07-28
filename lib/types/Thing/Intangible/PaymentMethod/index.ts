import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type PaymentMethodType from "../Enumeration/PaymentMethodType/index.ts"

import PaymentMethodComponent from "../../../../../components/Thing/Intangible/PaymentMethod/index.tsx"

export interface PaymentMethodProps {
	paymentMethodType?: PaymentMethodType
}

type PaymentMethod =
	& Thing
	& IntangibleProps
	& PaymentMethodProps

export default PaymentMethod
