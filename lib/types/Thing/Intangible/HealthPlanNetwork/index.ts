import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface HealthPlanNetworkProps {
	/** The costs to the patient for services under this network or formulary. */
	healthPlanCostSharing?: Boolean
	/** Name or unique ID of network. (Networks are often reused across different insurance plans.) */
	healthPlanNetworkId?: Text
	/** The tier(s) for this network. */
	healthPlanNetworkTier?: Text
}

type HealthPlanNetwork =
	& Thing
	& IntangibleProps
	& HealthPlanNetworkProps

export default HealthPlanNetwork
