import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface PaymentMethodTypeProps {
	"@type"?: "PaymentMethodType"}

type PaymentMethodType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& PaymentMethodTypeProps

export default PaymentMethodType
