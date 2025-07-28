import type { Integer, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"

import ConstraintNodeComponent from "../../../../../components/Thing/Intangible/ConstraintNode/index.tsx"

export interface ConstraintNodeProps {
	constraintProperty?: Property | URL
	numConstraints?: Integer
}

type ConstraintNode =
	& Thing
	& IntangibleProps
	& ConstraintNodeProps

export default ConstraintNode
