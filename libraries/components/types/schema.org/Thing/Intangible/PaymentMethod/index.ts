import type Thing from "../../index.ts"
import type PaymentMethodTypeEnum from "../Enumeration/PaymentMethodType/index.ts"
import type { IntangibleProps } from "../index.ts"
import type { PaymentCardType } from "./PaymentCard/index.ts"
import type { PaymentServiceType } from "./PaymentService/index.ts"

import { PaymentMethodType as PaymentMethodTypeComponent } from "../../../../../components/index.tsx"

export type PaymentMethodType =
	| "PaymentMethod"
	| PaymentCardType
	| PaymentServiceType

export interface PaymentMethodProps {
	"@type"?: PaymentMethodType
	paymentMethodType?:
		| PaymentMethodTypeEnum
		| ReturnType<typeof PaymentMethodTypeComponent>
}

type PaymentMethod = Thing & IntangibleProps & PaymentMethodProps

export default PaymentMethod
