import type { Number, Text } from "../../../DataType/index.ts"
import type Intangible from "../index.ts"
import type PriceSpecification from "../StructuredValue/PriceSpecification/index.ts"

export default interface HealthPlanCostSharingSpecification extends Intangible {
	/** Whether the coinsurance applies before or after deductible, etc. TODO: Is this a closed set? */
	healthPlanCoinsuranceOption?: Text
	/** The rate of coinsurance expressed as a number between 0.0 and 1.0. */
	healthPlanCoinsuranceRate?: Number
	/** The copay amount. */
	healthPlanCopay?: PriceSpecification
	/** Whether the copay is before or after deductible, etc. TODO: Is this a closed set? */
	healthPlanCopayOption?: Text
	/** The category or type of pharmacy associated with this cost sharing. */
	healthPlanPharmacyCategory?: Text
}
