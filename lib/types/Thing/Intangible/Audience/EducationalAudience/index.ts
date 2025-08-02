import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"

export type EducationalAudienceType = "EducationalAudience"

export interface EducationalAudienceProps {
	"@type"?: EducationalAudienceType
	educationalRole?: Text
}

type EducationalAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& EducationalAudienceProps

export default EducationalAudience
