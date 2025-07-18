import type { Text } from "../../../../DataType/index.ts"
import type Audience from "../index.ts"

export default interface EducationalAudience extends Audience {
	/** An educationalRole of an EducationalAudience. */
	educationalRole?: Text
}
