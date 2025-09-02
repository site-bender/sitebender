import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export type UserBlocksType = "UserBlocks"

export interface UserBlocksProps {
	"@type"?: UserBlocksType
}

type UserBlocks = Thing & EventProps & UserInteractionProps & UserBlocksProps

export default UserBlocks
