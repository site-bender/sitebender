import type Thing from "../../../index.ts"
import type WarrantyScope from "../../Enumeration/WarrantyScope/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import WarrantyScopeComponent from "../../../../../components/Thing/Intangible/Enumeration/WarrantyScope/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface WarrantyPromiseProps {
	"@type"?: "WarrantyPromise"
	durationOfWarranty?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	warrantyScope?: WarrantyScope | ReturnType<typeof WarrantyScopeComponent>
}

type WarrantyPromise =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& WarrantyPromiseProps

export default WarrantyPromise
