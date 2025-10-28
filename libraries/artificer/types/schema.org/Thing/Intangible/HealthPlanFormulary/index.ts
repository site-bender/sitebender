import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export type HealthPlanFormularyType = "HealthPlanFormulary"

export interface HealthPlanFormularyProps {
	"@type"?: HealthPlanFormularyType
	healthPlanCostSharing?: Boolean
	healthPlanDrugTier?: Text
	offersPrescriptionByMail?: Boolean
}

type HealthPlanFormulary = Thing & IntangibleProps & HealthPlanFormularyProps

export default HealthPlanFormulary
