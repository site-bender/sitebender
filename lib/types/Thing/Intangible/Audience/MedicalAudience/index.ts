// MedicalAudience extends Audience but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface MedicalAudienceProps {}

type MedicalAudience =
	& Thing
	& AudienceProps
	& IntangibleProps
	& MedicalAudienceProps

export default MedicalAudience
