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

import { DefinedTerm as DefinedTermComponent } from "../../../../../../components/index.tsx"
import { Enumeration as EnumerationComponent } from "../../../../../../components/index.tsx"
import { MeasurementTypeEnumeration as MeasurementTypeEnumerationComponent } from "../../../../../../components/index.tsx"
import { PropertyValue as PropertyValueComponent } from "../../../../../../components/index.tsx"
import { QualitativeValue as QualitativeValueComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"
import { StructuredValue as StructuredValueComponent } from "../../../../../../components/index.tsx"

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
