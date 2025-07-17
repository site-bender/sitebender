import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type HealthPlanCostSharingSpecificationProps from "../../../../types/Thing/HealthPlanCostSharingSpecification/index.ts"
import type IntangibleProps from "../../../../types/Thing/Intangible/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	HealthPlanCostSharingSpecificationProps,
	"HealthPlanCostSharingSpecification",
	ExtractLevelProps<HealthPlanCostSharingSpecificationProps, IntangibleProps>
>

export default function HealthPlanCostSharingSpecification(
	{
		healthPlanCoinsuranceOption,
		healthPlanCoinsuranceRate,
		healthPlanCopay,
		healthPlanCopayOption,
		healthPlanPharmacyCategory,
		schemaType = "HealthPlanCostSharingSpecification",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Intangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				healthPlanCoinsuranceOption,
				healthPlanCoinsuranceRate,
				healthPlanCopay,
				healthPlanCopayOption,
				healthPlanPharmacyCategory,
				...subtypeProperties,
			}}
		/>
	)
}
