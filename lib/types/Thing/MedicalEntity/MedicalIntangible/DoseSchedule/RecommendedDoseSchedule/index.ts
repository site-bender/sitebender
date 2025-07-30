import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

export interface RecommendedDoseScheduleProps {
	"@type"?: "RecommendedDoseSchedule"}

type RecommendedDoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps
	& RecommendedDoseScheduleProps

export default RecommendedDoseSchedule
