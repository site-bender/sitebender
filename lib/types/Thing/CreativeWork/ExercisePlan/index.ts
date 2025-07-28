import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../../MedicalEntity/index.ts"
import type { LifestyleModificationProps } from "../../MedicalEntity/LifestyleModification/index.ts"
import type { PhysicalActivityProps } from "../../MedicalEntity/LifestyleModification/PhysicalActivity/index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type Energy from "../../Intangible/Quantity/Energy/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"

import ExercisePlanComponent from "../../../../../components/Thing/CreativeWork/ExercisePlan/index.tsx"

export interface ExercisePlanProps {
	activityDuration?: Duration | QuantitativeValue
	activityFrequency?: QuantitativeValue | Text
	additionalVariable?: Text
	exerciseType?: Text
	intensity?: QuantitativeValue | Text
	repetitions?: Number | QuantitativeValue
	restPeriods?: QuantitativeValue | Text
	workload?: Energy | QuantitativeValue
}

type ExercisePlan =
	& Thing
	& MedicalEntityProps
	& LifestyleModificationProps
	& PhysicalActivityProps
	& CreativeWorkProps
	& ExercisePlanProps

export default ExercisePlan
