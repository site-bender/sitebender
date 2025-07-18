import type { Text } from "../../../DataType/index.ts"
import type MedicalEnumeration from "../../Intangible/Enumeration/MedicalEnumeration/index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type MedicalEntity from "../index.ts"
import type MedicalCondition from "../MedicalCondition/index.ts"
import type MedicalSign from "../MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.ts"
import type MedicalDevice from "../MedicalDevice/index.ts"

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
