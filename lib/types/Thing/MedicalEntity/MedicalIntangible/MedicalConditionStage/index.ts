import type { Number, Text } from "../../../../DataType/index.ts"
import type MedicalIntangible from "../index.ts"

export default interface MedicalConditionStage extends MedicalIntangible {
	/** The stage represented as a number, e.g. 3. */
	stageAsNumber?: Number
	/** The substage, e.g. 'a' for Stage IIIa. */
	subStageSuffix?: Text
}
