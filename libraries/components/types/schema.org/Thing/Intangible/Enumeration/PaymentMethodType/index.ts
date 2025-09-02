import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type PaymentMethodTypeType = "PaymentMethodType"

export interface PaymentMethodTypeProps {
	"@type"?: PaymentMethodTypeType
}

type PaymentMethodType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PaymentMethodTypeProps

export default PaymentMethodType
