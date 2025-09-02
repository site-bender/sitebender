import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export type UserTweetsType = "UserTweets"

export interface UserTweetsProps {
	"@type"?: UserTweetsType
}

type UserTweets = Thing & EventProps & UserInteractionProps & UserTweetsProps

export default UserTweets
