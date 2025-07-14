import Organization from "../../../Organization/index.ts"
import RealEstateAgent from "../../../Organization/LocalBusiness/RealEstateAgent/index.ts"
import Person from "../../../Person/index.ts"
import TradeAction from "../index.ts"

export default interface RentAction extends TradeAction {
	/** A sub property of participant. The owner of the real estate property. */
	landlord?: Organization | Person
	/** A sub property of participant. The real estate agent involved in the action. */
	realEstateAgent?: RealEstateAgent
}
