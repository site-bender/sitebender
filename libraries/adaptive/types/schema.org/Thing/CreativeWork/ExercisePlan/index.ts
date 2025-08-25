import type { Number, Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type Duration from "../../Intangible/Quantity/Duration/index.ts"
import type Energy from "../../Intangible/Quantity/Energy/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { MedicalEntityProps } from "../../MedicalEntity/index.ts"
import type { LifestyleModificationProps } from "../../MedicalEntity/LifestyleModification/index.ts"
import type { PhysicalActivityProps } from "../../MedicalEntity/LifestyleModification/PhysicalActivity/index.ts"
import type { CreativeWorkProps } from "../index.ts"

import { Duration as DurationComponent } from "../../../../../components/index.tsx"
import { Energy as EnergyComponent } from "../../../../../components/index.tsx"
import { QuantitativeValue as QuantitativeValueComponent } from "../../../../../components/index.tsx"

export type ExercisePlanType = "ExercisePlan"

export interface ExercisePlanProps {
	"@type"?: ExercisePlanType
	activityDuration?:
		| Duration
		| QuantitativeValue
		| ReturnType<typeof DurationComponent>
		| ReturnType<typeof QuantitativeValueComponent>
	activityFrequency?:
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
	additionalVariable?: Text
	exerciseType?: Text
	intensity?:
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
	repetitions?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	restPeriods?:
		| QuantitativeValue
		| Text
		| ReturnType<typeof QuantitativeValueComponent>
	workload?:
		| Energy
		| QuantitativeValue
		| ReturnType<typeof EnergyComponent>
		| ReturnType<typeof QuantitativeValueComponent>
}

type ExercisePlan =
	& Thing
	& MedicalEntityProps
	& LifestyleModificationProps
	& PhysicalActivityProps
	& CreativeWorkProps
	& ExercisePlanProps

export default ExercisePlan
