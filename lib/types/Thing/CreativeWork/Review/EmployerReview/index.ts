import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

export interface EmployerReviewProps {
	"@type"?: "EmployerReview"}

type EmployerReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& EmployerReviewProps

export default EmployerReview
