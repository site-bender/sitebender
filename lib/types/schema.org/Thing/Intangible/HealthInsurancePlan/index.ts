import type { Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type HealthPlanFormulary from "../HealthPlanFormulary/index.ts"
import type HealthPlanNetwork from "../HealthPlanNetwork/index.ts"
import type { IntangibleProps } from "../index.ts"
import type ContactPoint from "../StructuredValue/ContactPoint/index.ts"

import { HealthPlanFormulary as HealthPlanFormularyComponent } from "../../../../../components/index.tsx"
import { HealthPlanNetwork as HealthPlanNetworkComponent } from "../../../../../components/index.tsx"
import { ContactPoint as ContactPointComponent } from "../../../../../components/index.tsx"

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
