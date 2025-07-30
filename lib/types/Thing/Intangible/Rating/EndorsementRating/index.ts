import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RatingProps } from "../index.ts"

export interface EndorsementRatingProps {
	"@type"?: "EndorsementRating"}

type EndorsementRating =
	& Thing
	& IntangibleProps
	& RatingProps
	& EndorsementRatingProps

export default EndorsementRating
