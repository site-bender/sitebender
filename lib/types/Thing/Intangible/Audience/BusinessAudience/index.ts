import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type { AudienceProps } from "../index.ts"

export interface BusinessAudienceProps {
	/** The number of employees in an organization, e.g. business. */
	numberOfEmployees?: QuantitativeValue
	/** The size of the business in annual revenue. */
	yearlyRevenue?: QuantitativeValue
	/** The age of the business. */
	yearsInOperation?: QuantitativeValue
}

type BusinessAudience =
	& Thing
	& AudienceProps
	& IntangibleProps
	& BusinessAudienceProps

export default BusinessAudience
