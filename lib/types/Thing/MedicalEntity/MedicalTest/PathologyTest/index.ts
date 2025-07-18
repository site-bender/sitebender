import type { Text } from "../../../../DataType/index.ts"
import type MedicalTest from "../index.ts"

export default interface PathologyTest extends MedicalTest {
	/** The type of tissue sample required for the test. */
	tissueSample?: Text
}
