import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"
import type Organization from "../../../Organization/index.ts"
import type Person from "../../../Person/index.ts"
import type RealEstateAgent from "../../../Organization/LocalBusiness/RealEstateAgent/index.ts"

import RentActionComponent from "../../../../../../components/Thing/Action/TradeAction/RentAction/index.tsx"

export interface RentActionProps {
	landlord?: Organization | Person
	realEstateAgent?: RealEstateAgent
}

type RentAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& RentActionProps

export default RentAction
