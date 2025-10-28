import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

export type ReportedDoseScheduleType = "ReportedDoseSchedule"

export interface ReportedDoseScheduleProps {
	"@type"?: ReportedDoseScheduleType
}

type ReportedDoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps
	& ReportedDoseScheduleProps

export default ReportedDoseSchedule
