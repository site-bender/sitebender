import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { HealthInsurancePlanProps } from "../../../../types/Thing/Intangible/HealthInsurancePlan/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	HealthInsurancePlanProps,
	"HealthInsurancePlan",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function HealthInsurancePlan({
	benefitsSummaryUrl,
	contactPoint,
	healthPlanDrugOption,
	healthPlanDrugTier,
	healthPlanId,
	healthPlanMarketingUrl,
	includesHealthPlanFormulary,
	includesHealthPlanNetwork,
	usesHealthPlanIdStandard,
	schemaType = "HealthInsurancePlan",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				benefitsSummaryUrl,
				contactPoint,
				healthPlanDrugOption,
				healthPlanDrugTier,
				healthPlanId,
				healthPlanMarketingUrl,
				includesHealthPlanFormulary,
				includesHealthPlanNetwork,
				usesHealthPlanIdStandard,
				...subtypeProperties,
			}}
		/>
	)
}
