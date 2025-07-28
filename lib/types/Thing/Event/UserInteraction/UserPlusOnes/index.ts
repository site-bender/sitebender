import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

import UserPlusOnesComponent from "../../../../../../components/Thing/Event/UserInteraction/UserPlusOnes/index.tsx"

export interface UserPlusOnesProps {
}

type UserPlusOnes =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserPlusOnesProps

export default UserPlusOnes
