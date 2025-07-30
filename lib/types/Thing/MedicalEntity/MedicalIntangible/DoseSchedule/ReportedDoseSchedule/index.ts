import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

export interface ReportedDoseScheduleProps {
	"@type"?: "ReportedDoseSchedule"}

type ReportedDoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps
	& ReportedDoseScheduleProps

export default ReportedDoseSchedule
