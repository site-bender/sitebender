import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

import UserReviewComponent from "../../../../../../components/Thing/CreativeWork/Review/UserReview/index.tsx"

export interface UserReviewProps {
}

type UserReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& UserReviewProps

export default UserReview
