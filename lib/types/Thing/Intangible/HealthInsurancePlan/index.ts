import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"
import type HealthPlanFormulary from "../HealthPlanFormulary/index.ts"
import type HealthPlanNetwork from "../HealthPlanNetwork/index.ts"

import HealthInsurancePlanComponent from "../../../../../components/Thing/Intangible/HealthInsurancePlan/index.tsx"

export interface HealthInsurancePlanProps {
	benefitsSummaryUrl?: URL
	contactPoint?: ContactPoint
	healthPlanDrugOption?: Text
	healthPlanDrugTier?: Text
	healthPlanId?: Text
	healthPlanMarketingUrl?: URL
	includesHealthPlanFormulary?: HealthPlanFormulary
	includesHealthPlanNetwork?: HealthPlanNetwork
	usesHealthPlanIdStandard?: Text | URL
}

type HealthInsurancePlan =
	& Thing
	& IntangibleProps
	& HealthInsurancePlanProps

export default HealthInsurancePlan
