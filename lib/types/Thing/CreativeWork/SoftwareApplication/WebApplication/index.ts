import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { SoftwareApplicationProps } from "../index.ts"

export interface WebApplicationProps {
	/** Specifies browser requirements in human-readable text. For example, 'requires HTML5 support'. */
	browserRequirements?: Text
}

type WebApplication =
	& Thing
	& CreativeWorkProps
	& SoftwareApplicationProps
	& WebApplicationProps

export default WebApplication
