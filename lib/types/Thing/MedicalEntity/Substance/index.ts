import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type MaximumDoseSchedule from "../MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"

import MaximumDoseScheduleComponent from "../../../../components/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.ts"

export interface SubstanceProps {
	activeIngredient?: Text
	maximumIntake?:
		| MaximumDoseSchedule
		| ReturnType<typeof MaximumDoseScheduleComponent>
}

type Substance = Thing & MedicalEntityProps & SubstanceProps

export default Substance
