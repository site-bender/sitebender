// EndorsementRating extends Rating but adds no additional properties
import type Thing from "../../../index.ts"
import type { IntangibleProps } from "../../index.ts"
import type { RatingProps } from "../index.ts"

// deno-lint-ignore no-empty-interface
export interface EndorsementRatingProps {}

type EndorsementRating =
	& Thing
	& IntangibleProps
	& RatingProps
	& EndorsementRatingProps

export default EndorsementRating
