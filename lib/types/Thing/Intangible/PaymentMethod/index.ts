import type Thing from "../../index.ts"
import type PaymentMethodType from "../Enumeration/PaymentMethodType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type { PaymentCardType } from "./PaymentCard/index.ts"
import type { PaymentServiceType } from "./PaymentService/index.ts"

import PaymentMethodTypeComponent from "../../../../components/Thing/Intangible/Enumeration/PaymentMethodType/index.ts"

export type PaymentMethodType =
	| "PaymentMethod"
	| PaymentCardType
	| PaymentServiceType

export interface PaymentMethodProps {
	"@type"?: PaymentMethodType
	paymentMethodType?:
		| PaymentMethodType
		| ReturnType<typeof PaymentMethodTypeComponent>
}

type PaymentMethod = Thing & IntangibleProps & PaymentMethodProps

export default PaymentMethod
