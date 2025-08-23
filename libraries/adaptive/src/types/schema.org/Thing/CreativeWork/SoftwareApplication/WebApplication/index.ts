import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { SoftwareApplicationProps } from "../index.ts"

export type WebApplicationType = "WebApplication"

export interface WebApplicationProps {
	"@type"?: WebApplicationType
	browserRequirements?: Text
}

type WebApplication =
	& Thing
	& CreativeWorkProps
	& SoftwareApplicationProps
	& WebApplicationProps

export default WebApplication
