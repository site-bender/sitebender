import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type HealthPlanFormularyProps from "../../../../types/Thing/HealthPlanFormulary/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	HealthPlanFormularyProps,
	"HealthPlanFormulary",
	ExtractLevelProps<HealthPlanFormularyProps, IntangibleProps>
>

export default function HealthPlanFormulary(
	{
		healthPlanCostSharing,
		healthPlanDrugTier,
		offersPrescriptionByMail,
		schemaType = "HealthPlanFormulary",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				healthPlanCostSharing,
				healthPlanDrugTier,
				offersPrescriptionByMail,
				...subtypeProperties,
			}}
		/>
	)
}
