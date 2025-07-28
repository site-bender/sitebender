import type Thing from "../../../index.ts"
import type { EventProps } from "../../index.ts"
import type { UserInteractionProps } from "../index.ts"

export interface UserTweetsProps {}

type UserTweets = Thing & EventProps & UserInteractionProps & UserTweetsProps

export default UserTweets
