import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { AudienceProps } from "../index.ts"

export interface EducationalAudienceProps {
	"@type"?: "EducationalAudience"
	educationalRole?: Text
}

type EducationalAudience =
	& Thing
	& IntangibleProps
	& AudienceProps
	& EducationalAudienceProps

export default EducationalAudience
