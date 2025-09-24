import type { Boolean, Number, Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../../Enumeration/index.ts"
import type MeasurementMethodEnum from "../../Enumeration/MeasurementMethodEnum/index.ts"
import type MeasurementTypeEnumeration from "../../Enumeration/MeasurementTypeEnumeration/index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type StructuredValue from "../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"
import type { LocationFeatureSpecificationType } from "./LocationFeatureSpecification/index.ts"

import DefinedTermComponent from "../../../../../../../codewright/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import EnumerationComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/index.tsx"
import MeasurementMethodEnumComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.tsx"
import MeasurementTypeEnumerationComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/index.tsx"
import QualitativeValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/QualitativeValue/index.tsx"
import StructuredValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/index.tsx"
import PropertyValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"
import QuantitativeValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type PropertyValueType =
	| "PropertyValue"
	| LocationFeatureSpecificationType

export interface PropertyValueProps {
	"@type"?: PropertyValueType
	maxValue?: Number
	measurementMethod?:
		| DefinedTerm
		| MeasurementMethodEnum
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof MeasurementMethodEnumComponent>
	measurementTechnique?:
		| DefinedTerm
		| MeasurementMethodEnum
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof MeasurementMethodEnumComponent>
	minValue?: Number
	propertyID?: Text | URL
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

type PropertyValue =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& PropertyValueProps

export default PropertyValue
