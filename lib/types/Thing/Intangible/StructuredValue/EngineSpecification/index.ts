import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import QualitativeValueComponent from "../../../../../components/Thing/Intangible/Enumeration/QualitativeValue/index.ts"
import QuantitativeValueComponent from "../../../../../components/Thing/Intangible/StructuredValue/QuantitativeValue/index.ts"

export interface EngineSpecificationProps {
	"@type"?: "EngineSpecification"
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
