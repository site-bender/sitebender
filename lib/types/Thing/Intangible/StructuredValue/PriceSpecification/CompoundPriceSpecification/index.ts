import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"
import type PriceTypeEnumeration from "../../../Enumeration/PriceTypeEnumeration/index.ts"
import type UnitPriceSpecification from "../UnitPriceSpecification/index.ts"

export interface CompoundPriceSpecificationProps {
	priceComponent?: UnitPriceSpecification
	priceType?: PriceTypeEnumeration | Text
}

type CompoundPriceSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PriceSpecificationProps
	& CompoundPriceSpecificationProps

export default CompoundPriceSpecification
