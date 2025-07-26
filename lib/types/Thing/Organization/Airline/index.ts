import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { OrganizationProps } from "../index.ts"
import type BoardingPolicyType from "../../Intangible/Enumeration/BoardingPolicyType/index.ts"

export interface AirlineProps {
	boardingPolicy?: BoardingPolicyType
	iataCode?: Text
}

type Airline =
	& Thing
	& OrganizationProps
	& AirlineProps

export default Airline
