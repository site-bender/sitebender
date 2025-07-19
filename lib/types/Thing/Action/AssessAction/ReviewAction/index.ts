import type Review from "../../../CreativeWork/Review/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

export interface ReviewActionProps {
	/** A sub property of result. The review that resulted in the performing of the action. */
	resultReview?: Review
}

type ReviewAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReviewActionProps

export default ReviewAction
