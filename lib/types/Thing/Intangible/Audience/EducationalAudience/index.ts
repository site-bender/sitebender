import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type Audience from "../index.ts"
import type { AudienceProps } from "../index.ts"

export interface EducationalAudienceProps {
	/** An educationalRole of an EducationalAudience. */
	educationalRole?: Text
}

type EducationalAudience =
	& Thing
	& AudienceProps
	& IntangibleProps
	& EducationalAudienceProps

export default EducationalAudience
