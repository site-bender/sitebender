import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export interface WebSiteProps {
	"@type"?: "WebSite"
	issn?: Text
}

type WebSite = Thing & CreativeWorkProps & WebSiteProps

export default WebSite
