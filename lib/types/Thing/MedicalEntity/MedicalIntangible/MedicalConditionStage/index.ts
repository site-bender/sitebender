import type { Number, Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

export interface MedicalConditionStageProps {
	/** The stage represented as a number, e.g. 3. */
	stageAsNumber?: Number
	/** The substage, e.g. 'a' for Stage IIIa. */
	subStageSuffix?: Text
}

type MedicalConditionStage =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& MedicalConditionStageProps

export default MedicalConditionStage
