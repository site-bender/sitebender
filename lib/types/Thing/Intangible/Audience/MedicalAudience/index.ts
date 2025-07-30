import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"
import type { PeopleAudienceProps } from "../PeopleAudience/index.ts"

export interface MedicalAudienceProps {
	"@type"?: "MedicalAudience"}

type MedicalAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& PeopleAudienceProps
	& MedicalAudienceProps

export default MedicalAudience
