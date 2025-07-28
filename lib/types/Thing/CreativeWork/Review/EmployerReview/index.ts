import type Thing from "../../../index.ts"
import type { CreativeWorkProps } from "../../index.ts"
import type { ReviewProps } from "../index.ts"

import EmployerReviewComponent from "../../../../../../components/Thing/CreativeWork/Review/EmployerReview/index.tsx"

export interface EmployerReviewProps {
}

type EmployerReview =
	& Thing
	& CreativeWorkProps
	& ReviewProps
	& EmployerReviewProps

export default EmployerReview
