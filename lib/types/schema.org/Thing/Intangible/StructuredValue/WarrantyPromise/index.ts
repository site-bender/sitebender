import type Thing from "../../../index.ts"
import type WarrantyScope from "../../Enumeration/WarrantyScope/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import { WarrantyScope as WarrantyScopeComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type WarrantyPromiseType = "WarrantyPromise"

export interface WarrantyPromiseProps {
	"@type"?: WarrantyPromiseType
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
