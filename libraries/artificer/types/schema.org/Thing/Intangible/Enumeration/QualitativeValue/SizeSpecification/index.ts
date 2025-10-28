import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type QuantitativeValue from "../../../StructuredValue/QuantitativeValue/index.ts"
import type GenderType from "../../GenderType/index.ts"
import type { EnumerationProps } from "../../index.ts"
import type SizeGroupEnumeration from "../../SizeGroupEnumeration/index.ts"
import type SizeSystemEnumeration from "../../SizeSystemEnumeration/index.ts"
import type { QualitativeValueProps } from "../index.ts"

import GenderTypeComponent from "../../../../../../../../architect/src/define/Thing/Intangible/Enumeration/GenderType/index.tsx"
import SizeGroupEnumerationComponent from "../../../../../../../../architect/src/define/Thing/Intangible/Enumeration/SizeGroupEnumeration/index.tsx"
import SizeSystemEnumerationComponent from "../../../../../../../../architect/src/define/Thing/Intangible/Enumeration/SizeSystemEnumeration/index.tsx"
import QuantitativeValueComponent from "../../../../../../../../architect/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type SizeSpecificationType = "SizeSpecification"

export interface SizeSpecificationProps {
	"@type"?: SizeSpecificationType
	hasMeasurement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	sizeGroup?:
		| SizeGroupEnumeration
		| Text
		| ReturnType<typeof SizeGroupEnumerationComponent>
	sizeSystem?:
		| SizeSystemEnumeration
		| Text
		| ReturnType<typeof SizeSystemEnumerationComponent>
	suggestedAge?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	suggestedGender?: GenderType | Text | ReturnType<typeof GenderTypeComponent>
	suggestedMeasurement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type SizeSpecification =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& QualitativeValueProps
	& SizeSpecificationProps

export default SizeSpecification
