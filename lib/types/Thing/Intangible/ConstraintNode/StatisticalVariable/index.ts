import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Class from "../../Class/index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../../Enumeration/index.ts"
import type MeasurementMethodEnum from "../../Enumeration/MeasurementMethodEnum/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Property from "../../Property/index.ts"
import type { ConstraintNodeProps } from "../index.ts"

import ClassComponent from "../../../../../components/Thing/Intangible/Class/index.ts"
import StatisticalVariableComponent from "../../../../../components/Thing/Intangible/ConstraintNode/StatisticalVariable/index.ts"
import DefinedTermComponent from "../../../../../components/Thing/Intangible/DefinedTerm/index.ts"
import EnumerationComponent from "../../../../../components/Thing/Intangible/Enumeration/index.ts"
import MeasurementMethodEnumComponent from "../../../../../components/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.ts"
import PropertyComponent from "../../../../../components/Thing/Intangible/Property/index.ts"

export type StatisticalVariableType = "StatisticalVariable"

export interface StatisticalVariableProps {
	"@type"?: StatisticalVariableType
	measuredProperty?: Property | ReturnType<typeof PropertyComponent>
	measurementDenominator?:
		| StatisticalVariable
		| ReturnType<typeof StatisticalVariableComponent>
	measurementMethod?:
		| DefinedTerm
		| MeasurementMethodEnum
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof MeasurementMethodEnumComponent>
	measurementQualifier?: Enumeration | ReturnType<typeof EnumerationComponent>
	measurementTechnique?:
		| DefinedTerm
		| MeasurementMethodEnum
		| Text
		| URL
		| ReturnType<typeof DefinedTermComponent>
		| ReturnType<typeof MeasurementMethodEnumComponent>
	populationType?: Class | ReturnType<typeof ClassComponent>
	statType?: Property | Text | URL | ReturnType<typeof PropertyComponent>
}

type StatisticalVariable =
	& Thing
	& IntangibleProps
	& ConstraintNodeProps
	& StatisticalVariableProps

export default StatisticalVariable
