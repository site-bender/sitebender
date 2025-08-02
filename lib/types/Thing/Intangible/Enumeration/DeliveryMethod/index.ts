import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type DeliveryMethodType = "DeliveryMethod"

export interface DeliveryMethodProps {
	"@type"?: DeliveryMethodType
}

type DeliveryMethod =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& DeliveryMethodProps

export default DeliveryMethod
