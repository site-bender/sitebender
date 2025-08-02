import type BaseProps from "../../../../types/index.ts"
import type HealthInsurancePlanProps from "../../../../types/Thing/Intangible/HealthInsurancePlan/index.ts"

import Intangible from "../index.tsx"

export type Props = HealthInsurancePlanProps & BaseProps

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
	_type = "HealthInsurancePlan",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
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
		>
			{children}
		</Intangible>
	)
}
