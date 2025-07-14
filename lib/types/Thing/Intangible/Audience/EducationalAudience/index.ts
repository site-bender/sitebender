import { Text } from "../../../../DataType/index.ts"
import Audience from "../index.ts"

export default interface EducationalAudience extends Audience {
	/** An educationalRole of an EducationalAudience. */
	educationalRole?: Text
}
