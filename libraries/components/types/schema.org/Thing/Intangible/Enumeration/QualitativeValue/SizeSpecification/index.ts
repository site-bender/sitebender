import type { Text } from "../../../../../DataType/index.ts"
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type QuantitativeValue from "../../../StructuredValue/QuantitativeValue/index.ts"
import type GenderType from "../../GenderType/index.ts"
import type { EnumerationProps } from "../../index.ts"
import type SizeGroupEnumeration from "../../SizeGroupEnumeration/index.ts"
import type SizeSystemEnumeration from "../../SizeSystemEnumeration/index.ts"
import type { QualitativeValueProps } from "../index.ts"

import { GenderType as GenderTypeComponent } from "../../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../../components/index.tsx"
import { SizeGroupEnumeration as SizeGroupEnumerationComponent } from "../../../../../../../components/index.tsx"
import { SizeSystemEnumeration as SizeSystemEnumerationComponent } from "../../../../../../../components/index.tsx"

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
