import type Thing from "../../../../index.ts"
import type { MedicalEntityProps } from "../../../index.ts"
import type { MedicalConditionProps } from "../../index.ts"
import type { MedicalSignOrSymptomProps } from "../index.ts"

import MedicalSymptomComponent from "../../../../../../../components/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/MedicalSymptom/index.tsx"

export interface MedicalSymptomProps {
}

type MedicalSymptom =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& MedicalSignOrSymptomProps
	& MedicalSymptomProps

export default MedicalSymptom
