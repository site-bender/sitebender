// UserReview extends Review but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface UserReviewProps {}

type UserReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& UserReviewProps

export default UserReview
