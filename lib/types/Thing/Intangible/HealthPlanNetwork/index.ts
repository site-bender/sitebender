import { Boolean, Text } from "../../../DataType/index.ts"
import Intangible from "../index.ts"

export default interface HealthPlanNetwork extends Intangible {
	/** The costs to the patient for services under this network or formulary. */
	healthPlanCostSharing?: Boolean
	/** Name or unique ID of network. (Networks are often reused across different insurance plans.) */
	healthPlanNetworkId?: Text
	/** The tier(s) for this network. */
	healthPlanNetworkTier?: Text
}
