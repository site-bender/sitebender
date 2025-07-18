import type WarrantyScope from "../../Enumeration/WarrantyScope/index.ts"
import type StructuredValue from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

export default interface WarrantyPromise extends StructuredValue {
	/** The duration of the warranty promise. Common unitCode values are ANN for year, MON for months, or DAY for days. */
	durationOfWarranty?: QuantitativeValue
	/** The scope of the warranty promise. */
	warrantyScope?: WarrantyScope
}
