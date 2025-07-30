import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

export interface MaximumDoseScheduleProps {
	"@type"?: "MaximumDoseSchedule"}

type MaximumDoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps
	& MaximumDoseScheduleProps

export default MaximumDoseSchedule
