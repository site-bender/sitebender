import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

export type UserReviewType = "UserReview"

export interface UserReviewProps {
	"@type"?: UserReviewType
}

type UserReview = Thing & CreativeWorkProps & ReviewProps & UserReviewProps

export default UserReview
