import type { Number, Text, URL } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type PriceComponentTypeEnumeration from "../../../Enumeration/PriceComponentTypeEnumeration/index.ts"
import type PriceTypeEnumeration from "../../../Enumeration/PriceTypeEnumeration/index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type Duration from "../../../Quantity/Duration/index.ts"
import type { StructuredValueProps } from "../../index.ts"
import type QuantitativeValue from "../../QuantitativeValue/index.ts"
import type { PriceSpecificationProps } from "../index.ts"

import PriceComponentTypeEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/PriceComponentTypeEnumeration/index.ts"
import PriceTypeEnumerationComponent from "../../../../../../components/Thing/Intangible/Enumeration/PriceTypeEnumeration/index.ts"
import DurationComponent from "../../../../../../components/Thing/Intangible/Quantity/Duration/index.ts"
import QuantitativeValueComponent from "../../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface UnitPriceSpecificationProps {
	billingDuration?:
		| Duration
		| Number
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	billingIncrement?: Number
	billingStart?: Number
	priceComponentType?:
		| PriceComponentTypeEnumeration
		| ReturnType<typeof PriceComponentTypeEnumerationComponent>
	priceType?:
		| PriceTypeEnumeration
		| Text
		| ReturnType<typeof PriceTypeEnumerationComponent>
	referenceQuantity?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
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
