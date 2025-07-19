import type { Boolean, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"

export interface HealthPlanFormularyProps {
	/** The costs to the patient for services under this network or formulary. */
	healthPlanCostSharing?: Boolean
	/** The tier(s) of drugs offered by this formulary or insurance plan. */
	healthPlanDrugTier?: Text
	/** Whether prescriptions can be delivered by mail. */
	offersPrescriptionByMail?: Boolean
}

type HealthPlanFormulary =
	& Thing
	& IntangibleProps
	& HealthPlanFormularyProps

export default HealthPlanFormulary
