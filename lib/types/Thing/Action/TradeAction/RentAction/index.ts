import type Thing from "../../../index.ts"
import type Organization from "../../../Organization/index.ts"
import type RealEstateAgent from "../../../Organization/LocalBusiness/RealEstateAgent/index.ts"
import type Person from "../../../Person/index.ts"
import type { ActionProps } from "../../index.ts"
import type { TradeActionProps } from "../index.ts"

export interface RentActionProps {
	/** A sub property of participant. The owner of the real estate property. */
	landlord?: Organization | Person
	/** A sub property of participant. The real estate agent involved in the action. */
	realEstateAgent?: RealEstateAgent
}

type RentAction =
	& Thing
	& ActionProps
	& TradeActionProps
	& RentActionProps

export default RentAction
