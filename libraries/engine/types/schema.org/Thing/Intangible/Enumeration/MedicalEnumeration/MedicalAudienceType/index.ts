import type Thing from "../../../../index.ts"
import type { IntangibleProps } from "../../../index.ts"
import type { EnumerationProps } from "../../index.ts"
import type { MedicalEnumerationProps } from "../index.ts"

export type MedicalAudienceTypeType = "MedicalAudienceType"

export interface MedicalAudienceTypeProps {
	"@type"?: MedicalAudienceTypeType
}

type MedicalAudienceType =
	& Thing
	& IntangibleProps
	& EnumerationProps
	& MedicalEnumerationProps
	& MedicalAudienceTypeProps

export default MedicalAudienceType
