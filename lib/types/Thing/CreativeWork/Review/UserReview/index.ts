import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

export interface UserReviewProps {
	"@type"?: "UserReview"}

type UserReview = Thing & CreativeWorkProps & ReviewProps & UserReviewProps

export default UserReview
