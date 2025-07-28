import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"
import type Review from "../../../CreativeWork/Review/index.ts"

import ReviewActionComponent from "../../../../../../components/Thing/Action/AssessAction/ReviewAction/index.tsx"

export interface ReviewActionProps {
	resultReview?: Review
}

type ReviewAction =
	& Thing
	& ActionProps
	& AssessActionProps
	& ReviewActionProps

export default ReviewAction
