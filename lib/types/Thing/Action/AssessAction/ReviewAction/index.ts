import type Review from "../../../CreativeWork/Review/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

import ReviewComponent from "../../../../../components/Thing/CreativeWork/Review/index.ts"

export interface ReviewActionProps {
	resultReview?: Review | ReturnType<typeof ReviewComponent>
}

type ReviewAction = Thing & ActionProps & AssessActionProps & ReviewActionProps

export default ReviewAction
