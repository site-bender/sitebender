import type BaseProps from "../../../../types/index.ts"
import type { HealthPlanFormularyProps } from "../../../../types/Thing/Intangible/HealthPlanFormulary/index.ts"

import Intangible from "../index.tsx"

export type Props = HealthPlanFormularyProps & BaseProps

export default function HealthPlanFormulary({
	healthPlanCostSharing,
	healthPlanDrugTier,
	offersPrescriptionByMail,
	_type = "HealthPlanFormulary",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				healthPlanCostSharing,
				healthPlanDrugTier,
				offersPrescriptionByMail,
				...subtypeProperties,
			}}
		/>
	)
}
