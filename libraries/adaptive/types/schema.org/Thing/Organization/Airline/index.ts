import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type BoardingPolicyType from "../../Intangible/Enumeration/BoardingPolicyType/index.ts"
import type { OrganizationProps } from "../index.ts"

import { BoardingPolicyType as BoardingPolicyTypeComponent } from "../../../../../components/index.tsx"

export type AirlineType = "Airline"

export interface AirlineProps {
	"@type"?: AirlineType
	boardingPolicy?:
		| BoardingPolicyType
		| ReturnType<typeof BoardingPolicyTypeComponent>
	iataCode?: Text
}

type Airline = Thing & OrganizationProps & AirlineProps

export default Airline
