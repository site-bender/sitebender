import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

export type RecommendedDoseScheduleType = "RecommendedDoseSchedule"

export interface RecommendedDoseScheduleProps {
	"@type"?: RecommendedDoseScheduleType
}

type RecommendedDoseSchedule =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DoseScheduleProps
	& RecommendedDoseScheduleProps

export default RecommendedDoseSchedule
