import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

import UserPlaysComponent from "../../../../../../components/Thing/Event/UserInteraction/UserPlays/index.tsx"

export interface UserPlaysProps {
}

type UserPlays =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserPlaysProps

export default UserPlays
