import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import { QualitativeValue as QualitativeValueComponent } from "../../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../../components/index.tsx"

export type EngineSpecificationType = "EngineSpecification"

export interface EngineSpecificationProps {
	"@type"?: EngineSpecificationType
	engineDisplacement?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	enginePower?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	engineType?:
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
