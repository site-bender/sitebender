import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type PriceTypeEnumeration from "../../../Enumeration/PriceTypeEnumeration/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"
import type UnitPriceSpecification from "../UnitPriceSpecification/index.ts"

import PriceTypeEnumerationComponent from "../../../../../../../../architect/src/define/Thing/Intangible/Enumeration/PriceTypeEnumeration/index.tsx"
import UnitPriceSpecificationComponent from "../../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/PriceSpecification/UnitPriceSpecification/index.tsx"

export type CompoundPriceSpecificationType = "CompoundPriceSpecification"

export interface CompoundPriceSpecificationProps {
	"@type"?: CompoundPriceSpecificationType
	priceComponent?:
		| UnitPriceSpecification
		| ReturnType<typeof UnitPriceSpecificationComponent>
	priceType?:
		| PriceTypeEnumeration
		| Text
		| ReturnType<typeof PriceTypeEnumerationComponent>
}

type CompoundPriceSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PriceSpecificationProps
	& CompoundPriceSpecificationProps

export default CompoundPriceSpecification
