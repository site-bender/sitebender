import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { QualitativeValueProps } from "../index.ts"

import SteeringPositionValueComponent from "../../../../../../../components/Thing/Intangible/Enumeration/QualitativeValue/SteeringPositionValue/index.tsx"

export interface SteeringPositionValueProps {
}

type SteeringPositionValue =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& QualitativeValueProps
	& SteeringPositionValueProps

export default SteeringPositionValue
