import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export interface UserLikesProps {
	"@type"?: "UserLikes"}

type UserLikes = Thing & EventProps & UserInteractionProps & UserLikesProps

export default UserLikes
