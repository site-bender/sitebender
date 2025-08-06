import type Thing from "../../index.ts"
import type { EventProps } from "../index.ts"
import type { UserBlocksType } from "./UserBlocks/index.ts"
import type { UserCheckinsType } from "./UserCheckins/index.ts"
import type { UserCommentsType } from "./UserComments/index.ts"
import type { UserDownloadsType } from "./UserDownloads/index.ts"
import type { UserLikesType } from "./UserLikes/index.ts"
import type { UserPageVisitsType } from "./UserPageVisits/index.ts"
import type { UserPlaysType } from "./UserPlays/index.ts"
import type { UserPlusOnesType } from "./UserPlusOnes/index.ts"
import type { UserTweetsType } from "./UserTweets/index.ts"

export type UserInteractionType =
	| "UserInteraction"
	| UserBlocksType
	| UserDownloadsType
	| UserCheckinsType
	| UserLikesType
	| UserPageVisitsType
	| UserPlusOnesType
	| UserTweetsType
	| UserCommentsType
	| UserPlaysType

export interface UserInteractionProps {
	"@type"?: UserInteractionType
}

type UserInteraction = Thing & EventProps & UserInteractionProps

export default UserInteraction
