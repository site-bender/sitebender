import { Number } from "../../../../DataType/index.ts"
import Duration from "../../Quantity/Duration/index.ts"
import StructuredValue from "../index.ts"
import QuantitativeValue from "../QuantitativeValue/index.ts"

export default interface QuantitativeValueDistribution extends StructuredValue {
	/** The duration of the item (movie, audio recording, event, etc.) in [ISO 8601 duration format](http://en.wikipedia.org/wiki/ISO_8601). */
	duration?: QuantitativeValue | Duration
	/** The median value. */
	median?: Number
	/** The 10th percentile value. */
	percentile10?: Number
	/** The 25th percentile value. */
	percentile25?: Number
	/** The 75th percentile value. */
	percentile75?: Number
	/** The 90th percentile value. */
	percentile90?: Number
}
