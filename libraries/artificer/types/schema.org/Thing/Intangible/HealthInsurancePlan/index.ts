import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type HealthPlanFormulary from "../HealthPlanFormulary/index.ts"
import type HealthPlanNetwork from "../HealthPlanNetwork/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"

import HealthPlanFormularyComponent from "../../../../../../architect/src/define/Thing/Intangible/HealthPlanFormulary/index.tsx"
import HealthPlanNetworkComponent from "../../../../../../architect/src/define/Thing/Intangible/HealthPlanNetwork/index.tsx"
import ContactPointComponent from "../../../../../../architect/src/define/Thing/Intangible/StructuredValue/ContactPoint/index.tsx"

export type HealthInsurancePlanType = "HealthInsurancePlan"

export interface HealthInsurancePlanProps {
	"@type"?: HealthInsurancePlanType
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
