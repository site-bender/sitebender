import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { SoftwareApplicationProps } from "../index.ts"

export interface MobileApplicationProps {
	carrierRequirements?: Text
}

type MobileApplication =
	& Thing
	& CreativeWorkProps
	& SoftwareApplicationProps
	& MobileApplicationProps

export default MobileApplication
