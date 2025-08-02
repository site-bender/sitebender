import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type OfferItemConditionType = "OfferItemCondition"

export interface OfferItemConditionProps {
	"@type"?: OfferItemConditionType
}

type OfferItemCondition =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& OfferItemConditionProps

export default OfferItemCondition
