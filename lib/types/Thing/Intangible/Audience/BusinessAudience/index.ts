import QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import Audience from "../index.ts"

export default interface BusinessAudience extends Audience {
	/** The number of employees in an organization, e.g. business. */
	numberOfEmployees?: QuantitativeValue
	/** The size of the business in annual revenue. */
	yearlyRevenue?: QuantitativeValue
	/** The age of the business. */
	yearsInOperation?: QuantitativeValue
}
