import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type RealEstateAgent from "../../../Organization/LocalBusiness/RealEstateAgent/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import OrganizationComponent from "../../../../../components/Thing/Organization/index.ts"
import RealEstateAgentComponent from "../../../../../components/Thing/Organization/LocalBusiness/RealEstateAgent/index.ts"
import PersonComponent from "../../../../../components/Thing/Person/index.ts"

export type RentActionType = "RentAction"

export interface RentActionProps {
	"@type"?: RentActionType
	landlord?:
		| Organization
		| Person
		| ReturnType<typeof OrganizationComponent>
		| ReturnType<typeof PersonComponent>
	realEstateAgent?:
		| RealEstateAgent
		| ReturnType<typeof RealEstateAgentComponent>
}

type RentAction = Thing & ActionProps & TradeActionProps & RentActionProps

export default RentAction
