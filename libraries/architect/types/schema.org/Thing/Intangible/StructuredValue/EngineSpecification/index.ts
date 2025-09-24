import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import QualitativeValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/QualitativeValue/index.tsx"
import QuantitativeValueComponent from "../../../../../../../codewright/src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type EngineSpecificationType = "EngineSpecification"

export interface EngineSpecificationProps {
	"@type"?: EngineSpecificationType
	architectDisplacement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	architectPower?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	architectType?:
		| QualitativeValue
		| Text
		| URL
		| ReturnType<typeof QualitativeValueComponent>
	fuelType?:
		| QualitativeValue
		| Text
		| URL
		| ReturnType<typeof QualitativeValueComponent>
	torque?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
}

type EngineSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& EngineSpecificationProps

export default EngineSpecification
