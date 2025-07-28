import type { Text, URL } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { ConstraintNodeProps } from "../index.ts"
import type Class from "../../Class/index.ts"
import type DefinedTerm from "../../DefinedTerm/index.ts"
import type Enumeration from "../../Enumeration/index.ts"
import type MeasurementMethodEnum from "../../Enumeration/MeasurementMethodEnum/index.ts"
import type Property from "../../Property/index.ts"

import StatisticalVariableComponent from "../../../../../../components/Thing/Intangible/ConstraintNode/StatisticalVariable/index.tsx"

export interface StatisticalVariableProps {
	measuredProperty?: Property
	measurementDenominator?: StatisticalVariable
	measurementMethod?: DefinedTerm | MeasurementMethodEnum | Text | URL
	measurementQualifier?: Enumeration
	measurementTechnique?: DefinedTerm | MeasurementMethodEnum | Text | URL
	populationType?: Class
	statType?: Property | Text | URL
}

type StatisticalVariable =
	& Thing
	& IntangibleProps
	& ConstraintNodeProps
	& StatisticalVariableProps

export default StatisticalVariable
