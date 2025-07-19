// CriticReview extends Review but adds no additional properties
import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface CriticReviewProps {}

type CriticReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& CriticReviewProps

export default CriticReview
