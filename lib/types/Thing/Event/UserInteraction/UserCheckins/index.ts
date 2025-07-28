import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

import UserCheckinsComponent from "../../../../../../components/Thing/Event/UserInteraction/UserCheckins/index.tsx"

export interface UserCheckinsProps {
}

type UserCheckins =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserCheckinsProps

export default UserCheckins
