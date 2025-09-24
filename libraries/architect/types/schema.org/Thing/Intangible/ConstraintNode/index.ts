import type { Integer, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"
import type { StatisticalVariableType } from "./StatisticalVariable/index.ts"

import PropertyComponent from "../../../../../../codewright/src/define/Thing/Intangible/Property/index.tsx"

export type ConstraintNodeType = "ConstraintNode" | StatisticalVariableType

export interface ConstraintNodeProps {
	"@type"?: ConstraintNodeType
	constraintProperty?: Property | URL | ReturnType<typeof PropertyComponent>
	numConstraints?: Integer
}

type ConstraintNode = Thing & IntangibleProps & ConstraintNodeProps

export default ConstraintNode
