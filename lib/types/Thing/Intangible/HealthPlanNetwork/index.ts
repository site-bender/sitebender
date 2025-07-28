import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface HealthPlanNetworkProps {
	healthPlanCostSharing?: Boolean
	healthPlanNetworkId?: Text
	healthPlanNetworkTier?: Text
}

type HealthPlanNetwork = Thing & IntangibleProps & HealthPlanNetworkProps

export default HealthPlanNetwork
