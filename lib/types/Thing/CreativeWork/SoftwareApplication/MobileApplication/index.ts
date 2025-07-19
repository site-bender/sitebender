import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { SoftwareApplicationProps } from "../index.ts"

export interface MobileApplicationProps {
	/** Specifies specific carrier(s) requirements for the application (e.g. an application may only work on a specific carrier network). */
	carrierRequirements?: Text
}

type MobileApplication =
	& Thing
	& CreativeWorkProps
	& SoftwareApplicationProps
	& MobileApplicationProps

export default MobileApplication
