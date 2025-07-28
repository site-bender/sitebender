import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type StructuredValue from "../../StructuredValue/index.ts"
import type PropertyValue from "../../StructuredValue/PropertyValue/index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type Enumeration from "../index.ts"
import type { EnumerationProps } from "../index.ts"
import type MeasurementTypeEnumeration from "../MeasurementTypeEnumeration/index.ts"

import DefinedTermComponent from "../../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import EnumerationComponent from "../../../../../components/Thing/Intangible/Enumeration/index.ts"
import MeasurementTypeEnumerationComponent from "../../../../../components/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/index.ts"
import QualitativeValueComponent from "../../../../../components/Thing/Intangible/Enumeration/QualitativeValue/index.ts"
import StructuredValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/index.ts"
import PropertyValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/PropertyValue/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface QualitativeValueProps {
	additionalProperty?: PropertyValue | ReturnType<typeof PropertyValueComponent>
	equal?: QualitativeValue | ReturnType<typeof QualitativeValueComponent>
	greater?: QualitativeValue | ReturnType<typeof QualitativeValueComponent>
	greaterOrEqual?:
		| QualitativeValue
		| ReturnType<typeof QualitativeValueComponent>
	lesser?: QualitativeValue | ReturnType<typeof QualitativeValueComponent>
	lesserOrEqual?:
		| QualitativeValue
		| ReturnType<typeof QualitativeValueComponent>
	nonEqual?: QualitativeValue | ReturnType<typeof QualitativeValueComponent>
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

type QualitativeValue =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& QualitativeValueProps

export default QualitativeValue
