import type BaseProps from "../../../../types/index.ts"
import type HealthPlanCostSharingSpecificationProps from "../../../../types/Thing/Intangible/HealthPlanCostSharingSpecification/index.ts"

import Intangible from "../index.tsx"

export type Props = HealthPlanCostSharingSpecificationProps & BaseProps

export default function HealthPlanCostSharingSpecification({
	healthPlanCoinsuranceOption,
	healthPlanCoinsuranceRate,
	healthPlanCopay,
	healthPlanCopayOption,
	healthPlanPharmacyCategory,
	_type = "HealthPlanCostSharingSpecification",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Intangible
			{...props}
			_type={_type}
			subtypeProperties={{
				healthPlanCoinsuranceOption,
				healthPlanCoinsuranceRate,
				healthPlanCopay,
				healthPlanCopayOption,
				healthPlanPharmacyCategory,
				...subtypeProperties,
			}}
		>
			{children}
		</Intangible>
	)
}
