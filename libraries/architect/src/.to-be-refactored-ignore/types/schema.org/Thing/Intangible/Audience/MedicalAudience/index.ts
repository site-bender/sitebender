import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"
import type { PeopleAudienceProps } from "../PeopleAudience/index.ts"
import type { PatientType } from "./Patient/index.ts"

export type MedicalAudienceType = "MedicalAudience" | PatientType

export interface MedicalAudienceProps {
	"@type"?: MedicalAudienceType
}

type MedicalAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& PeopleAudienceProps
	& MedicalAudienceProps

export default MedicalAudience
