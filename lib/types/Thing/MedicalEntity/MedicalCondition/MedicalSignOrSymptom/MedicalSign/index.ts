import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalConditionProps } from "../../index.ts"
import type { MedicalSignOrSymptomProps } from "../index.ts"
import type MedicalTest from "../../../MedicalTest/index.ts"
import type PhysicalExam from "../../../MedicalProcedure/PhysicalExam/index.ts"

import MedicalSignComponent from "../../../../../../../components/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/MedicalSign/index.tsx"

export interface MedicalSignProps {
	identifyingExam?: PhysicalExam
	identifyingTest?: MedicalTest
}

type MedicalSign =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& MedicalSignOrSymptomProps
	& MedicalSignProps

export default MedicalSign
