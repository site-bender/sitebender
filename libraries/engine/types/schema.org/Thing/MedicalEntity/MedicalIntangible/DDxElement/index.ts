import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type MedicalCondition from "../../MedicalCondition/index.ts"
import type MedicalSignOrSymptom from "../../MedicalCondition/MedicalSignOrSymptom/index.ts"
import type { MedicalIntangibleProps } from "../index.ts"

import { MedicalCondition as MedicalConditionComponent } from "../../../../../../components/index.tsx"
import { MedicalSignOrSymptom as MedicalSignOrSymptomComponent } from "../../../../../../components/index.tsx"

export type DDxElementType = "DDxElement"

export interface DDxElementProps {
	"@type"?: DDxElementType
	diagnosis?: MedicalCondition | ReturnType<typeof MedicalConditionComponent>
	distinguishingSign?:
		| MedicalSignOrSymptom
		| ReturnType<typeof MedicalSignOrSymptomComponent>
}

type DDxElement =
	& Thing
	& MedicalEntityProps
	& MedicalIntangibleProps
	& DDxElementProps

export default DDxElement
