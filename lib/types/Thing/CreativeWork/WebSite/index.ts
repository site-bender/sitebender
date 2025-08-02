import type { Text } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"

export type WebSiteType = "WebSite"

export interface WebSiteProps {
	"@type"?: WebSiteType
	issn?: Text
}

type WebSite = Thing & CreativeWorkProps & WebSiteProps

export default WebSite
