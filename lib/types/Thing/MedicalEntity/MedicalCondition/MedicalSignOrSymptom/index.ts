import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalConditionProps } from "../index.ts"
import type MedicalTherapy from "../../MedicalProcedure/TherapeuticProcedure/MedicalTherapy/index.ts"

import MedicalSignOrSymptomComponent from "../../../../../../components/Thing/MedicalEntity/MedicalCondition/MedicalSignOrSymptom/index.tsx"

export interface MedicalSignOrSymptomProps {
	possibleTreatment?: MedicalTherapy
}

type MedicalSignOrSymptom =
	& Thing
	& MedicalEntityProps
	& MedicalConditionProps
	& MedicalSignOrSymptomProps

export default MedicalSignOrSymptom
