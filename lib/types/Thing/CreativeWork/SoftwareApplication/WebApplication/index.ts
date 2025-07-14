import { Text } from "../../../../DataType/index.ts"
import SoftwareApplication from "../index.ts"

export default interface WebApplication extends SoftwareApplication {
	/** Specifies browser requirements in human-readable text. For example, 'requires HTML5 support'. */
	browserRequirements?: Text
}
