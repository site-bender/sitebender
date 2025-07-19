// SteeringPositionValue extends QualitativeValue but adds no additional properties
import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { QualitativeValueProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface SteeringPositionValueProps {}

type SteeringPositionValue =
	& Thing
	& EnumerationProps
	& IntangibleProps
	& QualitativeValueProps
	& SteeringPositionValueProps

export default SteeringPositionValue
