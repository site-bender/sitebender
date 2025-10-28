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
import type { BedTypeType } from "./BedType/index.ts"
import type { DriveWheelConfigurationValueType } from "./DriveWheelConfigurationValue/index.ts"
import type { SizeSpecificationType } from "./SizeSpecification/index.ts"
import type { SteeringPositionValueType } from "./SteeringPositionValue/index.ts"

import DefinedTermComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import EnumerationComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/index.tsx"
import MeasurementTypeEnumerationComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/MeasurementTypeEnumeration/index.tsx"
import QualitativeValueComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/Enumeration/QualitativeValue/index.tsx"
import StructuredValueComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/index.tsx"
import PropertyValueComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/PropertyValue/index.tsx"
import QuantitativeValueComponent from "../../../../../../../pagewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type QualitativeValueType =
	| "QualitativeValue"
	| SizeSpecificationType
	| DriveWheelConfigurationValueType
	| BedTypeType
	| SteeringPositionValueType

export interface QualitativeValueProps {
	"@type"?: QualitativeValueType
	additionalProperty?:
		| PropertyValue
		| ReturnType<typeof PropertyValueComponent>
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
