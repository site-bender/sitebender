import { Text } from "../../../../DataType/index.ts"
import Review from "../index.ts"

export default interface ClaimReview extends Review {
	/** A short summary of the specific claims reviewed in a ClaimReview. */
	claimReviewed?: Text
}
