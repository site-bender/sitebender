import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

export type EmployerReviewType = "EmployerReview"

export interface EmployerReviewProps {
	"@type"?: EmployerReviewType
}

type EmployerReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& EmployerReviewProps

export default EmployerReview
