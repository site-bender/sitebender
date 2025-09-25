import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"

import PriceSpecificationComponent from "../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/PriceSpecification/index.tsx"

export type HealthPlanCostSharingSpecificationType =
	"HealthPlanCostSharingSpecification"

export interface HealthPlanCostSharingSpecificationProps {
	"@type"?: HealthPlanCostSharingSpecificationType
	healthPlanCoinsuranceOption?: Text
	healthPlanCoinsuranceRate?: Number
	healthPlanCopay?:
		| PriceSpecification
		| ReturnType<typeof PriceSpecificationComponent>
	healthPlanCopayOption?: Text
	healthPlanPharmacyCategory?: Text
}

type HealthPlanCostSharingSpecification =
	& Thing
	& IntangibleProps
	& HealthPlanCostSharingSpecificationProps

export default HealthPlanCostSharingSpecification
