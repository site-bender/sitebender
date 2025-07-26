import type { Number, Text, URL } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type { PriceSpecificationProps } from "../index.ts"
import type Duration from "../../../Quantity/Duration/index.ts"
import type PriceComponentTypeEnumeration from "../../../Enumeration/PriceComponentTypeEnumeration/index.ts"
import type PriceTypeEnumeration from "../../../Enumeration/PriceTypeEnumeration/index.ts"
import type QuantitativeValue from "../../QuantitativeValue/index.ts"

export interface UnitPriceSpecificationProps {
	billingDuration?: Duration | Number | QuantitativeValue
	billingIncrement?: Number
	billingStart?: Number
	priceComponentType?: PriceComponentTypeEnumeration
	priceType?: PriceTypeEnumeration | Text
	referenceQuantity?: QuantitativeValue
	unitCode?: Text | URL
	unitText?: Text
}

type UnitPriceSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PriceSpecificationProps
	& UnitPriceSpecificationProps

export default UnitPriceSpecification
