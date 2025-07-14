import { Text, URL } from "../../../DataType/index.ts"
import HealthPlanFormulary from "../HealthPlanFormulary/index.ts"
import HealthPlanNetwork from "../HealthPlanNetwork/index.ts"
import Intangible from "../index.ts"
import ContactPoint from "../StructuredValue/ContactPoint/index.ts"

export default interface HealthInsurancePlan extends Intangible {
	/** The URL that goes directly to the summary of benefits and coverage for the specific standard plan or plan variation. */
	benefitsSummaryUrl?: URL
	/** A contact point for a person or organization. */
	contactPoint?: ContactPoint
	/** TODO. */
	healthPlanDrugOption?: Text
	/** The tier(s) of drugs offered by this formulary or insurance plan. */
	healthPlanDrugTier?: Text
	/** The 14-character, HIOS-generated Plan ID number. (Plan IDs must be unique, even across different markets.) */
	healthPlanId?: Text
	/** The URL that goes directly to the plan brochure for the specific standard plan or plan variation. */
	healthPlanMarketingUrl?: URL
	/** Formularies covered by this plan. */
	includesHealthPlanFormulary?: HealthPlanFormulary
	/** Networks covered by this plan. */
	includesHealthPlanNetwork?: HealthPlanNetwork
	/** The standard for interpreting the Plan ID. The preferred is "HIOS". See the Centers for Medicare & Medicaid Services for more details. */
	usesHealthPlanIdStandard?: URL | Text
}
