import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

import HealthPlanFormularyComponent from "../../../../../components/Thing/Intangible/HealthPlanFormulary/index.tsx"

export interface HealthPlanFormularyProps {
	healthPlanCostSharing?: Boolean
	healthPlanDrugTier?: Text
	offersPrescriptionByMail?: Boolean
}

type HealthPlanFormulary =
	& Thing
	& IntangibleProps
	& HealthPlanFormularyProps

export default HealthPlanFormulary
