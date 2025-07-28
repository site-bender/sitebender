import type Thing from "../../index.ts"
import type PaymentMethodType from "../Enumeration/PaymentMethodType/index.ts"
import type { IntangibleProps } from "../index.ts"

import PaymentMethodTypeComponent from "../../../../components/Thing/Intangible/Enumeration/PaymentMethodType/index.ts"

export interface PaymentMethodProps {
	paymentMethodType?:
		| PaymentMethodType
		| ReturnType<typeof PaymentMethodTypeComponent>
}

type PaymentMethod = Thing & IntangibleProps & PaymentMethodProps

export default PaymentMethod
