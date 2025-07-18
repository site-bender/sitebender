import type PhysicalExam from "../../../../Intangible/Enumeration/MedicalEnumeration/PhysicalExam/index.ts"
import type MedicalTest from "../../../MedicalTest/index.ts"
import type MedicalSignOrSymptom from "../index.ts"

export default interface MedicalSign extends MedicalSignOrSymptom {
	/** A physical examination that can identify this sign. */
	identifyingExam?: PhysicalExam
	/** A diagnostic test that can identify this sign. */
	identifyingTest?: MedicalTest
}
