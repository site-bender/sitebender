import { Boolean, Text } from "../../../DataType/index.ts"
import Intangible from "../index.ts"

export default interface HealthPlanFormulary extends Intangible {
	/** The costs to the patient for services under this network or formulary. */
	healthPlanCostSharing?: Boolean
	/** The tier(s) of drugs offered by this formulary or insurance plan. */
	healthPlanDrugTier?: Text
	/** Whether prescriptions can be delivered by mail. */
	offersPrescriptionByMail?: Boolean
}
