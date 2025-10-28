import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export type SocialEventType = "SocialEvent"

export interface SocialEventProps {
	"@type"?: SocialEventType
}

type SocialEvent = Thing & EventProps & SocialEventProps

export default SocialEvent
