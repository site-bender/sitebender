import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type RealEstateAgent from "../../../Organization/LocalBusiness/RealEstateAgent/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

import OrganizationComponent from "../../../../../../src/define/Thing/Organization/index.tsx"
import RealEstateAgentComponent from "../../../../../../src/define/Thing/Organization/LocalBusiness/RealEstateAgent/index.tsx"
import PersonComponent from "../../../../../../src/define/Thing/Person/index.tsx"

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
