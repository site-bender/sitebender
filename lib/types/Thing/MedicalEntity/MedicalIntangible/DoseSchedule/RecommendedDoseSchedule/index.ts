import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

import RecommendedDoseScheduleComponent from "../../../../../../../components/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/RecommendedDoseSchedule/index.tsx"

export interface RecommendedDoseScheduleProps {
}

type RecommendedDoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps
	& RecommendedDoseScheduleProps

export default RecommendedDoseSchedule
