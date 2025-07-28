import type { BaseComponentProps, ExtractLevelProps } from "../../../../types/index.ts"
import type ThingProps from "../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../types/Thing/Intangible/index.ts"
import type { HealthPlanCostSharingSpecificationProps } from "../../../../types/Thing/Intangible/HealthPlanCostSharingSpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = BaseComponentProps<
	HealthPlanCostSharingSpecificationProps,
	"HealthPlanCostSharingSpecification",
	ExtractLevelProps<ThingProps, IntangibleProps>
>

export default function HealthPlanCostSharingSpecification({
	healthPlanCoinsuranceOption,
	healthPlanCoinsuranceRate,
	healthPlanCopay,
	healthPlanCopayOption,
	healthPlanPharmacyCategory,
	schemaType = "HealthPlanCostSharingSpecification",
	subtypeProperties = {},
	...props
}): Props {
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
