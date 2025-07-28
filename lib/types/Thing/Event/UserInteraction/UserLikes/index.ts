import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

import UserLikesComponent from "../../../../../../components/Thing/Event/UserInteraction/UserLikes/index.tsx"

export interface UserLikesProps {
}

type UserLikes =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserLikesProps

export default UserLikes
