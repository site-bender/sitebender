import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type WarrantyScope from "../../Enumeration/WarrantyScope/index.ts"

import WarrantyPromiseComponent from "../../../../../../components/Thing/Intangible/StructuredValue/WarrantyPromise/index.tsx"

export interface WarrantyPromiseProps {
	durationOfWarranty?: QuantitativeValue
	warrantyScope?: WarrantyScope
}

type WarrantyPromise =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& WarrantyPromiseProps

export default WarrantyPromise
