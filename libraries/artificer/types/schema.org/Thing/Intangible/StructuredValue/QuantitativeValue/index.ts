import type { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../../Enumeration/index.ts"
import type MeasurementTypeEnumeration from "../../Enumeration/MeasurementTypeEnumeration/index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type StructuredValue from "../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type PropertyValue from "../PropertyValue/index.ts"
import type { ObservationType } from "./Observation/index.ts"

import DefinedTermComponent from "../../../../../../../architect/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import EnumerationComponent from "../../../../../../../architect/src/define/Thing/Intangible/Enumeration/index.tsx"
import MeasurementTypeEnumerationComponent from "../../../../../../../architect/src/define/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/index.tsx"
import QualitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/Enumeration/QualitativeValue/index.tsx"
import StructuredValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/index.tsx"
import PropertyValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"
import QuantitativeValueComponent from "../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type QuantitativeValueType = "QuantitativeValue" | ObservationType

export interface QuantitativeValueProps {
	"@type"?: QuantitativeValueType
	additionalProperty?:
		| PropertyValue
		| ReturnType<typeof PropertyValueComponent>
	maxValue?: Number
	minValue?: Number
	unitCode?: Text | URL
	unitText?: Text
	value?:
		| Boolean
		| Number
		| StructuredValue
		| Text
		| ReturnType<typeof StructuredValueComponent>
	valueReference?:
		| DefinedTerm
		| Enumeration
		| MeasurementTypeEnumeration
		| PropertyValue
		| QualitativeValue
		| QuantitativeValue
		| StructuredValue
		| Text
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof EnumerationComponent>
		| ReturnType<typeof MeasurementTypeEnumerationComponent>
		| ReturnType<typeof PropertyValueComponent>
		| ReturnType<typeof QualitativeValueComponent>
		| ReturnType<typeof QuantitativeValueComponent>
		| ReturnType<typeof StructuredValueComponent>
}

type QuantitativeValue =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& QuantitativeValueProps

export default QuantitativeValue
