import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

import UserBlocksComponent from "../../../../../../components/Thing/Event/UserInteraction/UserBlocks/index.tsx"

export interface UserBlocksProps {
}

type UserBlocks =
	& Thing
	& EventProps
	& UserInteractionProps
	& UserBlocksProps

export default UserBlocks
