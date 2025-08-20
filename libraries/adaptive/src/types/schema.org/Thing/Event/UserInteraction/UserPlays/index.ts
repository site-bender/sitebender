import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export type UserPlaysType = "UserPlays"

export interface UserPlaysProps {
	"@type"?: UserPlaysType
}

type UserPlays = Thing & EventProps & UserInteractionProps & UserPlaysProps

export default UserPlays
