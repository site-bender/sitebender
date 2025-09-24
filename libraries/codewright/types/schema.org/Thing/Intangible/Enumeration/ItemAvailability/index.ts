import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export type ItemAvailabilityType = "ItemAvailability"

export interface ItemAvailabilityProps {
	"@type"?: ItemAvailabilityType
}

type ItemAvailability =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ItemAvailabilityProps

export default ItemAvailability
