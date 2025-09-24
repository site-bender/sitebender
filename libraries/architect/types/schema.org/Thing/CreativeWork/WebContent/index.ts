import type Thing from "../../index.ts"
import type { CreativeWorkProps } from "../index.ts"
import type { HealthTopicContentType } from "./HealthTopicContent/index.ts"

export type WebContentType = "WebContent" | HealthTopicContentType

export interface WebContentProps {
	"@type"?: WebContentType
}

type WebContent = Thing & CreativeWorkProps & WebContentProps

export default WebContent
