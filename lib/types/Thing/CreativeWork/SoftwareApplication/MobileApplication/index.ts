import type { Text } from "../../../../DataType/index.ts"
import type SoftwareApplication from "../index.ts"

export default interface MobileApplication extends SoftwareApplication {
	/** Specifies specific carrier(s) requirements for the application (e.g. an application may only work on a specific carrier network). */
	carrierRequirements?: Text
}
