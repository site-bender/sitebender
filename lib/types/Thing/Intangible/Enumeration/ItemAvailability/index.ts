import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"

export interface ItemAvailabilityProps {
}

type ItemAvailability =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& ItemAvailabilityProps

export default ItemAvailability
