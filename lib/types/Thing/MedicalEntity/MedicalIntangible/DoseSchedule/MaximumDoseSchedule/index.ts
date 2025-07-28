import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

import MaximumDoseScheduleComponent from "../../../../../../../components/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/MaximumDoseSchedule/index.tsx"

export interface MaximumDoseScheduleProps {
}

type MaximumDoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps
	& MaximumDoseScheduleProps

export default MaximumDoseSchedule
