import Review from "../../../CreativeWork/Review/index.ts"
import AssessAction from "../index.ts"

export default interface ReviewAction extends AssessAction {
	/** A sub property of result. The review that resulted in the performing of the action. */
	resultReview?: Review
}
