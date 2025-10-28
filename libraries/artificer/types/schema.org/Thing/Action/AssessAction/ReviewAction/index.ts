import type Review from "../../../CreativeWork/Review/index.ts"
import type Thing from "../../../index.ts"
import type { ActionProps } from "../../index.ts"
import type { AssessActionProps } from "../index.ts"

import ReviewComponent from "../../../../../../../architect/src/define/Thing/CreativeWork/Review/index.tsx"

export type ReviewActionType = "ReviewAction"

export interface ReviewActionProps {
	"@type"?: ReviewActionType
	resultReview?: Review | ReturnType<typeof ReviewComponent>
}

type ReviewAction = Thing & ActionProps & AssessActionProps & ReviewActionProps

export default ReviewAction
