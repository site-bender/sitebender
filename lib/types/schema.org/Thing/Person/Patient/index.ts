import type Thing from "../../index.ts"
import type { AudienceProps } from "../../Intangible/Audience/index.ts"
import type { MedicalAudienceProps } from "../../Intangible/Audience/MedicalAudience/index.ts"
import type { PeopleAudienceProps } from "../../Intangible/Audience/PeopleAudience/index.ts"
import type { IntangibleProps } from "../../Intangible/index.ts"
import type MedicalCondition from "../../MedicalEntity/MedicalCondition/index.ts"
import type Drug from "../../Product/Drug/index.ts"
import type { PersonProps } from "../index.ts"

import { MedicalCondition as MedicalConditionComponent } from "../../../../../components/index.tsx"
import { Drug as DrugComponent } from "../../../../../components/index.tsx"

export type PatientType = "Patient"

export interface PatientProps {
	"@type"?: PatientType
	diagnosis?: MedicalCondition | ReturnType<typeof MedicalConditionComponent>
	drug?: Drug | ReturnType<typeof DrugComponent>
	healthCondition?:
		| MedicalCondition
		| ReturnType<typeof MedicalConditionComponent>
}

type Patient =
	& Thing
	& IntangibleProps
	& AudienceProps
	& MedicalAudienceProps
	& PeopleAudienceProps
	& PersonProps
	& PatientProps

export default Patient
