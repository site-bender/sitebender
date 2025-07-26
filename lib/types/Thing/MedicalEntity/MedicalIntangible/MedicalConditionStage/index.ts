import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

export interface MedicalConditionStageProps {
	stageAsNumber?: Number
	subStageSuffix?: Text
}

type MedicalConditionStage =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& MedicalConditionStageProps

export default MedicalConditionStage
