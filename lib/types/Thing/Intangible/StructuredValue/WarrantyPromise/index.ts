import type Thing from "../../../index.ts"
import type WarrantyScope from "../../Enumeration/WarrantyScope/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

export interface WarrantyPromiseProps {
	/** The duration of the warranty promise. Common unitCode values are ANN for year, MON for months, or DAY for days. */
	durationOfWarranty?: QuantitativeValue
	/** The scope of the warranty promise. */
	warrantyScope?: WarrantyScope
}

type WarrantyPromise =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& WarrantyPromiseProps

export default WarrantyPromise
