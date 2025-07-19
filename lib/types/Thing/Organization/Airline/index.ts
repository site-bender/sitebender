import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BoardingPolicyType from "../../Intangible/Enumeration/BoardingPolicyType/index.ts"
import type { OrganizationProps } from "../index.ts"

export interface AirlineProps {
	/** The type of boarding policy used by the airline (e.g. zone-based or group-based). */
	boardingPolicy?: BoardingPolicyType
	/** IATA identifier for an airline or airport. */
	iataCode?: Text
}

type Airline =
	& Thing
	& OrganizationProps
	& AirlineProps

export default Airline
