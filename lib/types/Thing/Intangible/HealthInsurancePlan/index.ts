import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type HealthPlanFormulary from "../HealthPlanFormulary/index.ts"
import type HealthPlanNetwork from "../HealthPlanNetwork/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"

import HealthPlanFormularyComponent from "../../../../components/Thing/Intangible/HealthPlanFormulary/index.ts"
import HealthPlanNetworkComponent from "../../../../components/Thing/Intangible/HealthPlanNetwork/index.ts"
import ContactPointComponent from "../../../../components/Thing/Intangible/StructuredValue/ContactPoint/index.ts"

export interface HealthInsurancePlanProps {
	benefitsSummaryUrl?: URL
	contactPoint?: ContactPoint | ReturnType<typeof ContactPointComponent>
	healthPlanDrugOption?: Text
	healthPlanDrugTier?: Text
	healthPlanId?: Text
	healthPlanMarketingUrl?: URL
	includesHealthPlanFormulary?:
		| HealthPlanFormulary
		| ReturnType<typeof HealthPlanFormularyComponent>
	includesHealthPlanNetwork?:
		| HealthPlanNetwork
		| ReturnType<typeof HealthPlanNetworkComponent>
	usesHealthPlanIdStandard?: Text | URL
}

type HealthInsurancePlan = Thing & IntangibleProps & HealthInsurancePlanProps

export default HealthInsurancePlan
