import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type Class from "../../Class/index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../../Enumeration/index.ts"
import type MeasurementMethodEnum from "../../Enumeration/MeasurementMethodEnum/index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Property from "../../Property/index.ts"
import type { ConstraintNodeProps } from "../index.ts"

import ClassComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Class/index.tsx"
import StatisticalVariableComponent from "../../../../../../../codewright/src/define/Thing/Intangible/ConstraintNode/StatisticalVariable/index.tsx"
import DefinedTermComponent from "../../../../../../../codewright/src/define/Thing/Intangible/DefinedTerm/index.tsx"
import EnumerationComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/index.tsx"
import MeasurementMethodEnumComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Enumeration/MeasurementMethodEnum/index.tsx"
import PropertyComponent from "../../../../../../../codewright/src/define/Thing/Intangible/Property/index.tsx"

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
