import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export type HealthPlanNetworkType = "HealthPlanNetwork"

export interface HealthPlanNetworkProps {
	"@type"?: HealthPlanNetworkType
	healthPlanCostSharing?: Boolean
	healthPlanNetworkId?: Text
	healthPlanNetworkTier?: Text
}

type HealthPlanNetwork = Thing & IntangibleProps & HealthPlanNetworkProps

export default HealthPlanNetwork
