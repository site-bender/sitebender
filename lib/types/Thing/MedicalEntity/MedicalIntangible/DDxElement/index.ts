import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalIntangibleProps } from "../index.ts"
import type MedicalCondition from "../../MedicalCondition/index.ts"
import type MedicalSignOrSymptom from "../../MedicalCondition/MedicalSignOrSymptom/index.ts"

export interface DDxElementProps {
	diagnosis?: MedicalCondition
	distinguishingSign?: MedicalSignOrSymptom
}

type DDxElement =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DDxElementProps

export default DDxElement
