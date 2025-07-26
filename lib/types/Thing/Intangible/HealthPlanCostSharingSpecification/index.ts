import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"

export interface HealthPlanCostSharingSpecificationProps {
	healthPlanCoinsuranceOption?: Text
	healthPlanCoinsuranceRate?: Number
	healthPlanCopay?: PriceSpecification
	healthPlanCopayOption?: Text
	healthPlanPharmacyCategory?: Text
}

type HealthPlanCostSharingSpecification =
	& Thing
	& IntangibleProps
	& HealthPlanCostSharingSpecificationProps

export default HealthPlanCostSharingSpecification
