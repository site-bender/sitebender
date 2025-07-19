import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type MedicalCondition from "../../MedicalCondition/index.ts"
import type MedicalSignOrSymptom from "../../MedicalCondition/MedicalSignOrSymptom/index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

export interface DDxElementProps {
	/** One or more alternative conditions considered in the differential diagnosis process as output of a diagnosis process. */
	diagnosis?: MedicalCondition
	/** One of a set of signs and symptoms that can be used to distinguish this diagnosis from others in the differential diagnosis. */
	distinguishingSign?: MedicalSignOrSymptom
}

type DDxElement =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DDxElementProps

export default DDxElement
