import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface DeliveryMethodProps {
	"@type"?: "DeliveryMethod"}

type DeliveryMethod =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& DeliveryMethodProps

export default DeliveryMethod
