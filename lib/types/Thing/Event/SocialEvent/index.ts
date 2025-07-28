import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import SocialEventComponent from "../../../../../components/Thing/Event/SocialEvent/index.tsx"

export interface SocialEventProps {
}

type SocialEvent =
	& Thing
	& EventProps
	& SocialEventProps

export default SocialEvent
