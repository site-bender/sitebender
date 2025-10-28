import type Thing from "../../index.ts"
import type { MedicalEntityProps } from "../index.ts"
import type { DDxElementType } from "./DDxElement/index.ts"
import type { DoseScheduleType } from "./DoseSchedule/index.ts"
import type { DrugLegalStatusType } from "./DrugLegalStatus/index.ts"
import type { DrugStrengthType } from "./DrugStrength/index.ts"
import type { MedicalCodeType } from "./MedicalCode/index.ts"
import type { MedicalConditionStageType } from "./MedicalConditionStage/index.ts"

export type MedicalIntangibleType =
	| "MedicalIntangible"
	| MedicalCodeType
	| DDxElementType
	| DrugLegalStatusType
	| MedicalConditionStageType
	| DoseScheduleType
	| DrugStrengthType

export interface MedicalIntangibleProps {
	"@type"?: MedicalIntangibleType
}

type MedicalIntangible = Thing & MedicalEntityProps & MedicalIntangibleProps

export default MedicalIntangible
