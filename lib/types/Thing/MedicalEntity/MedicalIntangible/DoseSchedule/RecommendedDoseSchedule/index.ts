// RecommendedDoseSchedule extends DoseSchedule but adds no additional properties
import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalIntangibleProps } from "../../index.ts"
import type { DoseScheduleProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface RecommendedDoseScheduleProps {}

type RecommendedDoseSchedule =
	& Thing
	& DoseScheduleProps
	& MedicalEntityProps
	& MedicalIntangibleProps
	& RecommendedDoseScheduleProps

export default RecommendedDoseSchedule
