import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { StructuredValueProps } from "../index.ts"
import type QualitativeValue from "../../Enumeration/QualitativeValue/index.ts"
import type QuantitativeValue from "../QuantitativeValue/index.ts"

import EngineSpecificationComponent from "../../../../../../components/Thing/Intangible/StructuredValue/EngineSpecification/index.tsx"

export interface EngineSpecificationProps {
	engineDisplacement?: QuantitativeValue
	enginePower?: QuantitativeValue
	engineType?: QualitativeValue | Text | URL
	fuelType?: QualitativeValue | Text | URL
	torque?: QuantitativeValue
}

type EngineSpecification =
	& Thing
	& IntangibleProps
	& StructuredValueProps
	& EngineSpecificationProps

export default EngineSpecification
