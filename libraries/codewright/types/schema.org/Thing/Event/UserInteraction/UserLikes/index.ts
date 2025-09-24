import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export type UserLikesType = "UserLikes"

export interface UserLikesProps {
	"@type"?: UserLikesType
}

type UserLikes = Thing & EventProps & UserInteractionProps & UserLikesProps

export default UserLikes
