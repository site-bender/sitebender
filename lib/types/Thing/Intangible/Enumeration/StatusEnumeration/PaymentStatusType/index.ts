import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { StatusEnumerationProps } from "../index.ts"

export type PaymentStatusTypeType = "PaymentStatusType"

export interface PaymentStatusTypeProps {
	"@type"?: PaymentStatusTypeType
}

type PaymentStatusType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& StatusEnumerationProps
	& PaymentStatusTypeProps

export default PaymentStatusType
