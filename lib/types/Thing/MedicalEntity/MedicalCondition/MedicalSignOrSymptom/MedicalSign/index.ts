import type Thing from "../../../../index.ts"
import type PhysicalExam from "../../../../Intangible/Enumeration/MedicalEnumeration/PhysicalExam/index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type MedicalTest from "../../../MedicalTest/index.ts"
import type { MedicalConditionProps } from "../../index.ts"
import type { MedicalSignOrSymptomProps } from "../index.ts"

export interface MedicalSignProps {
	/** A physical examination that can identify this sign. */
	identifyingExam?: PhysicalExam
	/** A diagnostic test that can identify this sign. */
	identifyingTest?: MedicalTest
}

type MedicalSign =
	& Thing
	& MedicalConditionProps
	& MedicalEntityProps
	& MedicalSignOrSymptomProps
	& MedicalSignProps

export default MedicalSign
