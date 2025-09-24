import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RatingProps } from "../index.ts"

export type EndorsementRatingType = "EndorsementRating"

export interface EndorsementRatingProps {
	"@type"?: EndorsementRatingType
}

type EndorsementRating =
	& Thing
	& IntangibleProps
	& RatingProps
	& EndorsementRatingProps

export default EndorsementRating
