import type { Integer, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { IntangibleProps } from "../index.ts"
import type Property from "../Property/index.ts"

export interface ConstraintNodeProps {
	constraintProperty?: Property | URL
	numConstraints?: Integer
}

type ConstraintNode =
	& Thing
	& IntangibleProps
	& ConstraintNodeProps

export default ConstraintNode
