import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export interface UserBlocksProps {
	"@type"?: "UserBlocks"}

type UserBlocks = Thing & EventProps & UserInteractionProps & UserBlocksProps

export default UserBlocks
