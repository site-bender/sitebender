import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"

import UserInteractionComponent from "../../../../../components/Thing/Event/UserInteraction/index.tsx"

export interface UserInteractionProps {
}

type UserInteraction =
	& Thing
	& EventProps
	& UserInteractionProps

export default UserInteraction
