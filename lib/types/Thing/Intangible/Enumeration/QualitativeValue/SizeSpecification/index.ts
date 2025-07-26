import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { QualitativeValueProps } from "../index.ts"
import type GenderType from "../../GenderType/index.ts"
import type QuantitativeValue from "../../../StructuredValue/QuantitativeValue/index.ts"
import type SizeGroupEnumeration from "../../SizeGroupEnumeration/index.ts"
import type SizeSystemEnumeration from "../../SizeSystemEnumeration/index.ts"

export interface SizeSpecificationProps {
	hasMeasurement?: QuantitativeValue
	sizeGroup?: SizeGroupEnumeration | Text
	sizeSystem?: SizeSystemEnumeration | Text
	suggestedAge?: QuantitativeValue
	suggestedGender?: GenderType | Text
	suggestedMeasurement?: QuantitativeValue
}

type SizeSpecification =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& QualitativeValueProps
	& SizeSpecificationProps

export default SizeSpecification
