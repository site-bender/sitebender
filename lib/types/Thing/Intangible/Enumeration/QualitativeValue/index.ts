import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { EnumerationProps } from "../index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../index.ts"
import type MeasurementTypeEnumeration from "../MeasurementTypeEnumeration/index.ts"
import type PropertyValue from "../../StructuredValue/PropertyValue/index.ts"
import type QuantitativeValue from "../../StructuredValue/QuantitativeValue/index.ts"
import type StructuredValue from "../../StructuredValue/index.ts"

import QualitativeValueComponent from "../../../../../../components/Thing/Intangible/Enumeration/QualitativeValue/index.tsx"

export interface QualitativeValueProps {
	additionalProperty?: PropertyValue
	equal?: QualitativeValue
	greater?: QualitativeValue
	greaterOrEqual?: QualitativeValue
	lesser?: QualitativeValue
	lesserOrEqual?: QualitativeValue
	nonEqual?: QualitativeValue
	valueReference?:
		| DefinedTerm
		| Enumeration
		| MeasurementTypeEnumeration
		| PropertyValue
		| QualitativeValue
		| QuantitativeValue
		| StructuredValue
		| Text
}

type QualitativeValue =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& QualitativeValueProps

export default QualitativeValue
