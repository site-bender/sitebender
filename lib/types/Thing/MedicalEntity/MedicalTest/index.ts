import { Text } from "../../../DataType/index.ts"
import MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import Drug from "../../Product/Drug/index.ts"
import MedicalEntity from "../index.ts"
import MedicalCondition from "../MedicalCondition/index.ts"
import MedicalSign from "../MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.ts"
import MedicalDevice from "../MedicalDevice/index.ts"

export default interface MedicalTest extends MedicalEntity {
	/** Drugs that affect the test's results. */
	affectedBy?: Drug
	/** Range of acceptable values for a typical patient, when applicable. */
	normalRange?: Text | MedicalEnumeration
	/** A sign detected by the test. */
	signDetected?: MedicalSign
	/** A condition the test is used to diagnose. */
	usedToDiagnose?: MedicalCondition
	/** Device used to perform the test. */
	usesDevice?: MedicalDevice
}
