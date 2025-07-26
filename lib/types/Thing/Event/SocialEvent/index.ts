import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

export interface SocialEventProps {
}

type SocialEvent =
	& Thing
	& EventProps
	& SocialEventProps

export default SocialEvent
