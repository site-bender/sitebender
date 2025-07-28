import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

import ReportedDoseScheduleComponent from "../../../../../../../components/Thing/MedicalEntity/MedicalIntangible/DoseSchedule/ReportedDoseSchedule/index.tsx"

export interface ReportedDoseScheduleProps {
}

type ReportedDoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps
	& ReportedDoseScheduleProps

export default ReportedDoseSchedule
